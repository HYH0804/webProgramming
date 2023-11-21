const Sequelize = require('sequelize');

class Cheering extends Sequelize.Model {
    static initiate(sequelize) {
        Cheering.init({
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            team: {
                type: Sequelize.STRING(15),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Cheering',
            tableName: 'cheering',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        //db.cheering.belongsToMany(db.Post, { through: 'PostHashtag' });
        db.Cheering.belongsTo(db.User,{foreignKey: 'userId', targetKey: 'id'});
    }
};
//PostHashtag는 중간 table로 index.js에서 db 객체에 안넣어둠 >> db.PostHashtag 불가 >> 접근하고 싶다면 db.sequelize.models.<중간테이블>
module.exports = Cheering;
