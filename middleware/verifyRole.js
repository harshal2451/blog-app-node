const messages = require('../controllers/response_messages/message')
const db = require('../models');
const UORelation = db.UORelation
const { getRoleOrg, getRoleAdmin } = require("../controllers/helperFunction/helper")

const verifyRole = async (request, response, next) => {
  const { id } = request
  const roles = await UORelation.findOne({ where : {user_id : id} })
  const roleOrg = await getRoleOrg()
  const roleAdmin = await getRoleAdmin()
  if(roles && (roles.role == roleOrg || roles.role == roleAdmin)){
      next();
  } else {
    return response.status(400).send({
        message: messages.not_permission
      });
  }
}

module.exports = { verifyRole }