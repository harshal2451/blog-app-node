const { Users } = require('../models');
const config = require('../config/config.json');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const { col, Op, where, fn } = Sequelize
const response_messages = require("./response_messages/message");
const bcrypt = require("bcrypt");



const signup = async (request, response) => {
  try {
    const { email, password, full_name } = request.body;
    if (full_name && email && password) {
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
        full_name,
      });

      if (!newUser) return response
        .status(400)
        .send({ success: false, message: response_messages.s_wrong });
      
      return response
        .status(400)
        .send({ success: true, message: response_messages.u_added });
     
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
    const { email, password } = request.body
    const oldUser = await Users.findOne({ where: { email } });
    if (!oldUser) return response.status(400).json({ success: false, message: response_messages.u_not_exist });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return response.status(400).json({ success: false, message: response_messages.invalid_credentials });
    const user = await getUserDetails(email)
    if (!user) return response.status(200).send({ success: false, message: response_messages.u_not_found });
    let organization_id = user.organisation[0].organization_id
    let role = user.organisation[0].role
    let roleClient = await getRoleClient()
    console.log(role, roleClient);
    if (role == roleClient) {
      let client = await getActiveClient([oldUser.id])
      if (client.indexOf(oldUser.id) == -1) return response.status(200).send({ sucess: false, message: response_messages.no_permission })
    } else {
      const members = await getActiveEmployee([oldUser.id])
      if (members.indexOf(oldUser.id) == -1) return response.status(200).send({ sucess: false, message: response_messages.no_permission })
    }
    const orgRole = await getRoleOrg()
    const userRole = getUserRole(user)
    let ssObject = {}, emp
    if (!user.verified) {
      if (userRole === orgRole) {
        const returnValue = await sendOtp(email, response);
        return returnValue
      } else {
        await sendEmailLink(user.id, email)
        return response.status(400).json({ success: false, message: response_messages.p_v_link });
      }
    }
    const token = jwt.sign({ id: user.id }, config.secret);
    let totalSecond
    emp = await Employee.findOne({ where: { user_id: user.id, organization_id } })
    if (!type) {
      await UToken.destroy({ where: { user_id: user.id } })
      const addToken = await UToken.create({ token, user_id: user.id })
      if (!addToken) return response.status(200).send({ success: false, message: response_messages.s_wrong });
      let today = new Date().toISOString().slice(0, 10)
      totalSecond = await Activity.findAll({
        where: { member_id: user.id, [Op.eq]: where(fn('date', col('start_date')), '=', today) },
        attributes: [[fn('sum', col('duration')), 'seconds'], [fn('sum', col('productive_duration')), 'total_second']]
      })
      if (emp) {
        let tPolicy = await TrackerPolicy.findOne({ where: { id: emp.tracker_policy_id } })
        if (tPolicy) {
          ssObject.start_ss_time = tPolicy.ss_start_min
          ssObject.end_ss_time = tPolicy.ss_end_min
        }
      }
    }
    let isReporting, isPM, isClient
    let allProjects = await getOrgProjects(organization_id)
    let prgRole = await getRolePrg()
    let isPm = await ProjectMember.findOne({ where: { project_id: allProjects, user_id: user.id, role: prgRole } })
    let clientRole = await getRoleClient()
    let isOneClient = await ProjectMember.findOne({ where: { user_id: user.id, role: clientRole, project_id: allProjects } })
    isClient = isOneClient ? true : false
    isPm ? isPM = true : isPM = false
    let data = await getUserDetails(email)
    let { users } = await leaveReporter(data)
    let isHead = await Department.findOne({ where: { head: user.id } })
    if (users.length > 0 || isHead) {
      isReporting = true
    } else {
      isReporting = false
    }
    return response.status(200).send({
      success: true, response_data: user, token, totalSecond, isReporting, screenshot_timing: ssObject, emp_id: emp ? emp.id : null, isProjectManager: isPM, isClient: isClient
    });
  }
  catch (err) {
    return response.status(500).send({ success: false, message: err.message });
  };
}



module.exports = { login, signup }