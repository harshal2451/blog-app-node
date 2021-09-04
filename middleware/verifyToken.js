const config = require('../config/auth.config');
var jwt = require("jsonwebtoken");
const messages = require('../controllers/response_messages/message')
const db = require('../models');
const { Employee } = require('../models');
const UToken = db.UToken

const verifyTokenUser = (request,response,next) => {
  let token = request.headers.authorization.split(" ")[1];
  if (!token) {
    return response.status(401).send({
      message: messages.unauthorized
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: messages.unauthorized
      });
    }
    let { user } = request
    let organization_id = user.organisation[0].organization_id
    const isToken = await UToken.findOne({ where : { user_id: decoded.id, token }})
    if(isToken){
        request.id = decoded.id;
        const employee = await Employee.findOne({ where : { user_id: decoded.id, organization_id }})
        if(employee) request.employee_data = employee
        next();
    } else {
        return response.status(401).send({
            message: messages.unauthorized
          });
    }
  });
}

module.exports = { verifyTokenUser }