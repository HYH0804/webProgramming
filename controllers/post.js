const { Post, Cheering } = require('../models');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.update({
            content: req.body.content,
            img: req.body.url,
        }, {
            where: { id: req.params.id }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.send('OK');
    } catch (error) {
        console.error(error);
        next(error);
    }
};