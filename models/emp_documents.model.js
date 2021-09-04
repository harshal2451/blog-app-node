module.exports = (sequelize, Sequelize) => {
    const EmployeeDocuments = sequelize.define(
      "emp_documents", 
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
        employee_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_employee",
              key: "id",
            },
        },
        documents_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_documents",
              key: "id",
            },
        },
        documents_type : {
            type: Sequelize.STRING,
        },
        documents_url : {
            type: Sequelize.STRING,
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
    return EmployeeDocuments;
  };
  