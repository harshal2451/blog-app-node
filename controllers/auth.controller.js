const {Users, Roles, Activity, Setting, Organisation, UORelation, UToken, Department, Employee, TimerSetting, ProjectMember, UserReporting, Project, TrackerPolicy}  = require('../models');
const config = require('../config/auth.config');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const { col, Op, where, fn } = Sequelize
const response_messages = require("./response_messages/message");
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');
const { createUserOrganization, sendEmailLink, getRoleOrg, getUserRole, sendAcceptInvitationEmail, asyncForEach, findProjectManager, getOrgProjects, getRolePrg, getActiveEmployee, getRoleClient, getActiveClient } = require('./helperFunction/helper')
const ejs = require("ejs");
const { leaveReporter, findEmails } = require('./leave_apply.controller');

// let transporter = nodemailer.createTransport({
//     host: config.hEmail ,
//     port: config.ePort,
//     secure: true,
//     service : config.service,
//     auth: {
//       user: config.email,
//       pass: config.password,
//     }  
// });
let transporter = nodemailer.createTransport({
  host: config.hEmail,
  port: config.ePort,
  secure: false,
  auth: {
    user: config.email,
    pass: config.password,
  },
  tls: {
    rejectUnauthorized: false,
  }, 
});

const getUserDetails = async(email) => {
  const user = await Users.findOne({ where: { email },
    attributes: {exclude: ['password']},
    include: [{
        model: UORelation,
        where: {
        user_id : col('users_user.id')
        },
        as : 'organisation',
        required: false,
        include : {
          model : Roles,
          where : {
            id : col('organisation.role')
          },
          required: false,
          attributes: ['id', 'title', 'level'],
          as : 'roles',
        }
    }
  ]
  })
  return user ? user : false
}

const sendOtp = async (email, response, forgotPassword) => {
  let otp = Math.random();
  otp = Math.floor(100000 + Math.random() * 900000);
  const data = await ejs.renderFile(__dirname + "/htmlPage/otp.ejs", { otp });
  const oToken = jwt.sign({ oToken: otp }, config.secret, {
    expiresIn: "600s",
  });
  if (email) {
    const mailOptions = {
      from: config.myEmail,
      to: email,
      subject: forgotPassword
        ? "OTP for Forgot Password"
        : "OTP for Registration",
      html: data
    }; 
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response.status(500).send({ success: false, message: error });
      }
      return response.send({
        success: true,
        message: response_messages.o_send,
        response_data: { oToken, email },
      });
    });
  } else {
    return response
      .status(400)
      .send({ success: false, message: response_messages.s_wrong });
  }
};

const signup = async (request, response) => {
    try {
      const { full_name, organization_name, email, password, phone} = request.body;
      await sendOtp(email, response);
      if ( full_name && email && password && organization_name ) {
        const user = await Users.findOne({
          where: {
            email
          },
        });
        if (user)
          return response
            .status(400)
            .send({ success: false, message: response_messages.u_exist });
  
        let encryptedPassword = await bcrypt.hash(password, 12);
  
        const newUser = await Users.create({
          email,
          password: encryptedPassword,
          phone,
          full_name,
          skipOnBoarding: false
        });

        if(!newUser) return response
            .status(400)
            .send({ success: false, message: response_messages.s_wrong });
        
        if (newUser.id) {
          const newOrganization = await Organisation.create({
            organization_name,
            user_id: newUser.id
          });

          if(!newOrganization) return response.status(400).send({ success: false, message: response_messages.s_wrong })
          const role = await getRoleOrg()
          const userOrgazation = await createUserOrganization(newUser.id, newOrganization.id, role)
          const userSetting = await Setting.create({ user_id: newUser.id})
          const timerSetting = await TimerSetting.create({ organization_id : newOrganization.id})
          if(!userOrgazation || !userSetting || !timerSetting) return response.status(400).send({ success: false, message: response_messages.s_wrong })
        } else {
          return response
            .status(400)
            .send({ success: false, message: response_messages.s_wrong });
        }
      } else {
        return response
          .status(400)
          .send({ success: false, message: response_messages.s_wrong });
      }
    } catch (err) {
      return response.status(500).send({ success: false, message: err.message });
    }
  };


const login = async (request, response) => {
    try {
        const {email, password, type } = request.body
        const oldUser = await Users.findOne({ where: { email } });
        if (!oldUser) return response.status(400).json({success: false, message: response_messages.u_not_exist });
        const oldUser2 = await UORelation.findOne({ where: { user_id:oldUser.id, status:true }});
        if (!oldUser2) return response.status(400).json({success: false, message: response_messages.u_not_exist });
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return response.status(400).json({success: false, message: response_messages.invalid_credentials });
        const user = await getUserDetails(email)
        if (!user) return response.status(200).send({ success: false, message:response_messages.u_not_found });
        let organization_id = user.organisation[0].organization_id
        let role = user.organisation[0].role
        let roleClient = await getRoleClient()
        console.log(role, roleClient);
        if(role == roleClient){
          let client = await getActiveClient([oldUser.id])
          if(client.indexOf(oldUser.id) == -1) return response.status(200).send({sucess:false, message: response_messages.no_permission})
        }else{
          const members = await getActiveEmployee([oldUser.id])
          if(members.indexOf(oldUser.id) == -1) return response.status(200).send({sucess:false, message: response_messages.no_permission})
        }
        const orgRole = await getRoleOrg()
        const userRole = getUserRole(user)
        let ssObject = {}, emp
        if(!user.verified){
          if(userRole === orgRole){
            const returnValue = await sendOtp(email, response);
            return returnValue
          } else {
            await sendEmailLink(user.id, email)
            return response.status(400).json({success: false, message: response_messages.p_v_link });
          }
        } 
        const token = jwt.sign({ id: user.id }, config.secret);
        let totalSecond
        emp = await Employee.findOne({ where : { user_id: user.id, organization_id} })
        if(!type){
          await UToken.destroy({ where : { user_id : user.id} })
          const addToken = await UToken.create({ token,user_id: user.id})
          if(!addToken) return response.status(200).send({ success: false, message:response_messages.s_wrong });
          let today = new Date().toISOString().slice(0, 10)
          totalSecond = await Activity.findAll({ 
            where : {member_id : user.id, [Op.eq]: where(fn('date', col('start_date')), '=', today)}, 
            attributes:  [[fn('sum', col('duration')), 'seconds'],  [fn('sum', col('productive_duration')), 'total_second']]} )
            if(emp){
              let tPolicy = await TrackerPolicy.findOne({ where : { id: emp.tracker_policy_id } })
              if(tPolicy){
                ssObject.start_ss_time = tPolicy.ss_start_min
                ssObject.end_ss_time = tPolicy.ss_end_min
              }
            }
        }
        let isReporting, isPM, isClient
        let allProjects = await getOrgProjects(organization_id)
        let prgRole = await getRolePrg()
        let isPm = await ProjectMember.findOne({ where : { project_id: allProjects, user_id: user.id, role:prgRole } })
        let clientRole = await getRoleClient()
        let isOneClient = await ProjectMember.findOne({ where: { user_id:user.id, role:clientRole, project_id: allProjects }})
        isClient = isOneClient ? true : false
        isPm ? isPM = true : isPM = false
        let data = await getUserDetails(email)
        let { users } = await leaveReporter(data) 
        let isHead = await Department.findOne({ where : { head : user.id }})
        if(users.length > 0 || isHead){
          isReporting = true
        } else {
          isReporting = false
        }
        return response.status(200).send({
            success: true, response_data : user, token, totalSecond, isReporting, screenshot_timing:ssObject, emp_id: emp ? emp.id : null, isProjectManager:isPM, isClient:isClient
        });
    }
    catch(err){
        return response.status(500).send({ success: false, message: err.message });
    };
}

const verifyOtp = async (request, response) => {
    const { email, otp, oToken, type } = request.body
    try{
        if(otp && oToken && email){
            let isValid
            jwt.verify(oToken, config.secret, async (err, decoded) => {
              if(err){
                return response.status(200).send({ success: false, message: response_messages.o_expired});
              }
              isValid =  otp == decoded.oToken ? true : false
              if(isValid){
                const isUser = await Users.update({ verified: true}, {
                  where: { email },
                  returning : true,
                })
                if(isUser == 0)  return response.status(400).send({ success: false, message: response_messages.u_not_found});
                const user = await getUserDetails(email)
                const token = jwt.sign({ id: user.id }, config.secret);
                if(!type){
                  await UToken.destroy({ where : { user_id : user.id} })
                  const addToken = await UToken.create({ token,user_id: user.id})
                  if(!addToken) return response.status(200).send({ success: false, message:response_messages.s_wrong });
                }
                return response.status(200).send({ success: true, message: response_messages.s_verfied, response_data : {user, token }});
              } else {
                return response.status(200).send({ success: false, message: response_messages.i_otp, oToken });
              }
            });
        } else {
            return response.status(400).send({ success: false, message: response_messages.s_wrong });
        }
        
    } catch(err){
        return response.status(500).send({ success: false, message: err.message });
    }    
}

const skipOnBoard = async (request, response) => {
  try {
    const skipOnBoardUser = await Users.update({
      skipOnBoarding: true
    }, {where : {id: request.id}})
    if(skipOnBoardUser[0] == 0) return response.status(400).send({ success: false, message: response_messages.s_wrong});
    return response.status(200).send({ success: true, message: response_messages.success})
  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const updateUser = async ( request, response) => {
  try {
    const { id } = request.params;
    const { full_name, phone } = request.body
    let condition = {}
      if(typeof full_name!== undefined) condition.full_name = full_name
      if(typeof phone!== undefined) condition.phone = phone
      if(Object.keys(condition).length !== 0 && condition.constructor === Object){
        const updatedUser = await Users.update(condition, {
            where: { id },
            returning : true,
            plain: true
        })
        if(updatedUser[0] == 0) return response.status(200).send({ success: false, message: response_messages.s_wrong});
        const newUser = await Users.findOne({ where: { id }, attributes: { exclude: ['password'] } });
        return response.status(200).send({ success: true, message: response_messages.success, response_data : newUser})
      } else {
        return response.status(200).send({ success: false, message: response_messages.s_wrong});
      }

  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const deleteUser = async (request, response) => {
  try{
    const { id } = request.params;
    const data = await Users.destroy({
      where: {id}
    });
    if(!data) return response.status(400).send({ success: false, message:response_messages.u_not_exist});
    return response.status(200).send({ success: true, message:response_messages.d_success});
    } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const forgotPassword = async (request, response) => {
  try {
    const { email } = request.body;

    if (email) {
      const user = await Users.findOne({
        where: {
          email,
        },
      });
      if (!user) return response.status(200).send({ success: false, message: response_messages.e_not_exist });
      const member = await getActiveEmployee([user.id]) 
      if(member.indexOf(user.id) == -1) return response.status(200).send({ success: false, message: response_messages.no_permission });
      const oldUser2 = await UORelation.findOne({ where: { user_id: user.id, status: true }});
      if (!oldUser2) return response.status(404).json({success: false, message: response_messages.u_not_exist });
      const returnValue = await sendOtp(email, response, true);
      return returnValue;
    } else {
      return response.status(400).send({ success: false, message: response_messages.s_wrong });
    }
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const updateNewPassword = async (request, response) => {
  try {
    const { new_password, type } = request.body;
    if ( new_password) {
      const { id, user } = request;
      let organization_id = user.organisation[0].organization_id
      const ifUser = await Users.findOne({ where : { id }})
      if(!ifUser){
        return response.status(400).send({ success: false, message: response_messages.u_not_exist });
      }
      if(ifUser && type && ifUser.verified === true){
        return response
          .status(400)
          .send({ success: false, message: response_messages.a_accepted });
      }
      let encryptedPassword = await bcrypt.hash(new_password, 12);
      const userData = await Users.update(
        { password: encryptedPassword, verified: true},
        { where: { id }, returning: true }
      );
      if (userData === 0) {
        return response
          .status(400)
          .send({ success: false, message: response_messages.u_not_found });
      }
      if(type){
        let employee = await Employee.findOne({ where : { user_id: id, organization_id }})
        let emails = await findEmails(employee, user)
        let pmEmails = await findProjectManager(organization_id, id)
        if(pmEmails && pmEmails.length > 0){
          pmEmails.forEach((obj) => {
            if(emails.indexOf(obj) == -1){
              emails.push(obj)
            }
          })
        }
        let user_name = ifUser.full_name ? ifUser.full_name : 'Unknown'
        if(emails && emails.length > 0){
            await asyncForEach(emails, async (obj) => {
                await sendAcceptInvitationEmail(obj, user_name)
            })
        }
      }
      return response.status(200).send({ success: true, message:response_messages.success});
    } else {
      return response
        .status(400)
        .send({ success: false, message: response_messages.s_wrong });
    }
  } catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  }
};

const changePassword = async(request, response) => {
  try{
    const user = await Users.findOne({ where : { id: request.id}})
    const { oldPassword, newPassword} = request.body
    if(oldPassword && newPassword){
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) return response.status(400).json({success: false, message: response_messages.p_i });
        const isOldPassword = await bcrypt.compare(newPassword, user.password);
        if (isOldPassword) return response.status(400).json({success: false, message: response_messages.a_p });
        let password = await bcrypt.hash(newPassword, 12);
        const newUser = await Users.update({
          password
        }, { where : { id: request.id}})
        if(!newUser) return response.status(400).send({ success: false, message: response_messages.s_wrong});
        return response.status(200).send({ success: true, message: response_messages.success, response_data : newUser})
      } else {
        return response.status(200).send({ success: true, message: response_messages.p_i })
      }
  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const resendOtp = async (request, response) => {
  try {
    const { email, type} = request.body
    await sendOtp(email, response, type);
  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const resendInvitation = async(request, response) => {
  try {
    const { id, email } = request.body
    await sendEmailLink(id, email)
    return response.status(200).send({ success: true, message: response_messages.r_invitation})
  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}

const cancelInvitation = async(request, response) => {
  try {
    const { id } = request.params
    const { user } = request
    let organization_id = user.organisation[0].organization_id
    let projects = []
    if(!id){
        return response.status(400).send({ success: false, message: response_messages.s_wrong })
    }
    const allProjects = await Project.findAll({ where : { organization_id }})
    const employee = await Employee.destroy({where : {user_id: id, organization_id}})
    const uoRelation = await UORelation.destroy({ where: { user_id:id, organization_id} })
    const users = await Users.destroy({ where: { id } })
    if(allProjects && allProjects.length > 0){
        allProjects.forEach((obj) => {
            projects.push(obj.id)
        })
    }
    const projectMember = await ProjectMember.destroy({ where : { project_id: {  [Op.in]: projects }, user_id: {  [Op.in]: [id] }}})
    const userReport = await UserReporting.destroy({ where : { user_id: { [Op.in]: [id]}, organization_id }})
    const userReporting = await UserReporting.update({ reporting_to : user.id }, { where : { reporting_to: { [Op.in]: [id] }, organization_id }})
    return response.status(200).send({ success: true, message: response_messages.c_invitation})
  } catch(err){
    return response.status(500).send({ success: false, message: err.message });
  }
}


module.exports = { login, verifyOtp, signup, skipOnBoard, updateUser, deleteUser, changePassword, forgotPassword, updateNewPassword, resendOtp, getUserDetails, resendInvitation, cancelInvitation }