const { User, Post } = require('../models');

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 ' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 ' });
};

exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: '서비스이름',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}