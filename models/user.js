const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize){ //컬럼 정보
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'), //provider 컬럼에 local이나 kakao만 입력가능하게끔 제한
                allowNull: false,
                defaultValue: 'local'
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true, //email은 local 일때, snsId는 kakao 일때
            }
        }, {
            sequelize,
            timestamps: true, //createdAt , updatedAt
            underscored: false, //crated_at 처럼 _ 로 표기할거냐
            modelName: 'User',
            tableName: 'users',
            paranoid: true, //deletedAt 추가 // soft delete
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Cheering,{foreignKey: 'userId', sourceKey: 'id'});

    }
}; //나의 팔로잉하고 있는 사람을 찾을려면 FollowerId에서 내 Id를 찾아야됨
// 어떤 사람의 팔로워를 찾고싶다면 팔로잉 Id에서 어떤사람의 Id를 찾아야됨
// >> users.getFollowings 로 가독성 높힐려고 as 쓴거
//레코드.get속성() >> 그 속성에서 레코드의 pk값에 해당하는 놈과 일치하는 레코드를 가져옴

module.exports=User;