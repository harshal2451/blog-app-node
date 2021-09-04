module.exports = (sequelize, Sequelize) => {
  const LeaveType = sequelize.define(
    "org_leave_type", 
    {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      organization_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "organizations_organization",
            key: "id",
          },
      },
      title : {
        allowNull: false,
        type: Sequelize.STRING,
      },
      code : {
        type: Sequelize.STRING,
      },
      code : {
        type: Sequelize.STRING,
      },
      description : {
          type: Sequelize.TEXT,
      },
      show_leave_description : {
        type: Sequelize.BOOLEAN,
      },
      is_paid_leave: {
      type: Sequelize.BOOLEAN,
      },
      is_sick_leave: {
      type: Sequelize.BOOLEAN,
      },
      is_statutory_leave: {
        type: Sequelize.BOOLEAN,
      },
      restrict_to_gender: {
        type: Sequelize.STRING,
      },
      restrict_to_marital_status: {
        type: Sequelize.STRING,
      },
      list_of_reasons: {
        type: Sequelize.BOOLEAN,
      },
      status: {
          type: Sequelize.BOOLEAN,
          defaultValue:true
      }
    },
    {
      timestamps : true,
      paranoid : true
    }
  );
  return LeaveType;
};
