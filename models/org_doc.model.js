module.exports = (sequelize, Sequelize) => {
    const OrganisationDocuments = sequelize.define(
      "org_documents",
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
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        document_types: {
          type: Sequelize.TEXT, 
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
    return OrganisationDocuments;
  };
