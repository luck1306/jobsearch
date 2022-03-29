const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            major: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            phonenumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: '잘부탁드립니다',
            }, // 기술 column도 추가 
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) { }
}