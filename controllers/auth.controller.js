const { Users } = require('../models');
const config = require('../config/auth.config');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
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
    const user = await Users.findOne({ where: { email }, attributes: ['id', 'email', 'full_name']})
    if (!user) return response.status(200).send({ success: false, message: response_messages.u_not_found });   
    const token = jwt.sign({ id: user.id }, config.secret);
    user.dataValues.token = token
     return response.status(200).send({
      success: true, response_data: user,
    });
  }
  catch (err) {
    console.log(err);
    return response.status(500).send({ success: false, message: err.message });
  };
}



module.exports = { login, signup }