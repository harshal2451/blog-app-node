module.exports = (sequelize, Sequelize) => {
    const EmployeeDocuments = sequelize.define(
      "employee_document", 
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
        emp_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_employee",
              key: "id",
            },
        },
        doc_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "org_documents",
              key: "id",
            },
        },
        doc_type : {
            type: Sequelize.STRING,
        },
        doc_url : {
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
  