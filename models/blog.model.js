module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define(
        "blogs",
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            blog_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            blog_description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            blog_url: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true
        }
    );
    return Blogs;
};
