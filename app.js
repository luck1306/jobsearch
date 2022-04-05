const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');
const passport = require('passport'); // login
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');
const postRouter = require('./routes/post');
const joinRouter = require('./routes/join');
const loginRouter = require('./routes/login');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); // login
const { isLoggedIn, isNotLoggedIn } = require('./routes/middlewear');

dotenv.config();
const app = express();
passportConfig(); // login

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
sequelize.sync({ force: false })
    .then(() => {
        console.log('DB CONNECT SUCCESS');
    }).catch((err) => {
        console.error(err);
    });
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
app.use(passport.initialize()); //login
app.use(passport.session()); // login

app.use('/login', /*isNotLoggedIn,*/ loginRouter);
app.use('/join', isNotLoggedIn, joinRouter);
app.use('/post', /*isLoggedIn,*/ postRouter);
app.use('/', indexRouter);

app.use((req, res, next) => { // 모든 미들웨어를 돌았을 때 포함되지 않은 것이 있을 때 발생
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => { // 에러처리 미들웨어 (나중에 배우자)
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기 중');
});