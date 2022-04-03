const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userid: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(20),
                allowNull: false,
            }
        }, {
            sequelize,
            underscored: false,
            timestamps: false,
            modelName: 'User', //<-변경 후, 변경 전 : Post
            tableName: 'users', // <-변경 후, 변경 전 : posts
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static asssociate(db) { db.User.hasOne(db.Post); }
}