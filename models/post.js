const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static initiate(sequelize){
        Post.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: { //이미지 여러개 올리고싶으면 img 테이블 따로 만들어서 테이블끼리 관계
                type: Sequelize.STRING(200),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName:'Post',
            tableName:'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }


    static associate(db) {
        db.Post.belongsTo(db.User); //2번째 매개변수 없으니까 Post에 자동으로 FK 생성하고 User 테이블과 엮어줌 >> FK 자체가 본 테이블의 PK가 다른 테이블의 속성에 붙으니까(이게 FK자나)
        //db.Post.belongsToMany(db.cheering, {through: 'PostHashtag'});
    }
}

module.exports = Post;