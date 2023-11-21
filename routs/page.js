const express = require('express');
const router = express.Router();
const { renderJoin,renderMain,renderProfile } = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require("../middlewares");

router.use((req,res,next)=> {
    res.locals.user = req.user; //local >> res,req 라이프타임동안 존재하는 변수 , req.user는 passport 메서드
    res.locals.followerCount = 0;
    res.locals.followingCount=0;
    res.locals.followingIdList= [];
    next();
});

router.get('/profile',isLoggedIn,renderProfile); //프로필은 로그인 한 사람들이 하는거니까 , profile html 렌더링
router.get('/join',isNotLoggedIn,renderJoin); //회원가입은 로그인 안한 사람들이 하는거니까 , join html 렌더링
router.get('/',renderMain); //main html 렌더링


module.exports = router;