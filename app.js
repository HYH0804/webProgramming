const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv=require('dotenv');
const passport = require('passport');
//process.env.COOKIE_SECRET 없음
dotenv.config(); //process.env
//process.env.COOKIE_SECRET 있음
const pageRouter = require('./routs/page'); //page.js에 rout 전부 몰아놓음
const authRouter = require('./routs/auth');
const postRouter = require('./routs/post')
const { sequelize } = require('./models');
const passportConfig = require('./passport');


const app = express();
passportConfig();
app.set('port',process.env.PORT || 8002);
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch: true,
});
//sequelize 연동
sequelize.sync({ force: false }) //force는 새로 서버 띄워지면 table 전부 삭제하고 다시 생성됨 : true (기존 테이블 전부 날라감), 그냥 바로 서버띄우기 : false
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/img',express.static(path.join(__dirname,'uploads')));
app.use(express.json()); //res에 json으로 오면 알아서 파싱해서 객체로 바꿔주고 이 객체를 req.body에 넣음
app.use(express.urlencoded({extended:false})); //form으로 오면 알아서 파싱해서 key:value
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));
app.use(passport.initialize()); //req.user, req.login , req.isAuthenticate , req.logout 생성 , passport는  cookie로 로그인함
app.use(passport.session()); //connect.sid라는 이름으로 세션쿠키가 브라우저로 전송

app.use('/',pageRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use((req,res,next)=> {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status=404;
    next(error);
});
app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'),() => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
