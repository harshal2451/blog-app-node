module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users_user",
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      skipOnBoarding : {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      verified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deletedAt : {
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    {
      freezeTableName: true,
      timestamps : true,
      paranoid : true
    }
  );
  return Users;
};
