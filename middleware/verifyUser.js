const messages = require('../controllers/response_messages/message')
const db = require('../models');
const UORelation = db.UORelation
const Users = db.Users
const Sequelize = require('sequelize');
const { Setting, TimerSetting } = require('../models');
const { col } = Sequelize

const verifyValidUser = async (request, response, next) => {
  const { id } = request
  const user = await Users.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: UORelation,
        where: {
          user_id: col("users_user.id"),
          status:true
        },
        as: "organisation",
      }
    ]
  })
  if (user) {
    request.user = user
    let organization_id = user.organisation[0].organization_id
    let getSetting = await Setting.findOne({ where : { user_id:id}})
    let timerSetting = await TimerSetting.findOne({ where : { organization_id }})
    if(timerSetting){
      request.min_productivity_activity = timerSetting.min_productivity_activity
      request.min_productivity_all = timerSetting.min_productivity_all
    }
    if(!getSetting){
      let createSetting = await Setting.create({ user_id:id})
    }
    next();
  } else {
    return response.status(401).send({
        message: messages.u_not_exist
      });
  }
}

module.exports = { verifyValidUser }