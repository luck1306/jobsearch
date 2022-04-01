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
            timestamps: false,
            paranoid: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static asssociate(db) { db.User.hasMany(db.Post); }
}