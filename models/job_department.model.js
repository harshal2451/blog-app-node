module.exports = (sequelize, Sequelize) => {
    const JobDepartment = sequelize.define(
      "org_job_department",
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
        department_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "departments_department",
              key: "id",
            },
        },
        job_id : {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "job_titles",
              key: "id",
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
      },
      {
        timestamps : true,
        paranoid : true
      }
    );
    return JobDepartment;
  };
  