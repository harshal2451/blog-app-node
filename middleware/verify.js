const config = require('../config/auth.config');
var jwt = require("jsonwebtoken");
const messages = require('../controllers/response_messages/message')

const verifyUser = (request, response, next) => {
  let token = request.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return response.status(401).send({
      message: messages.unauthorized
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: messages.unauthorized
      });
    }
    request.userId = decoded.id;
    next();
  });
}

module.exports = { verifyUser }