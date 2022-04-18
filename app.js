const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const chooseRouter = require('./routes/choose');
const postRouter = require('./routes/post');
const joinRouter = require('./routes/join');
const loginRouter = require('./routes/login');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const { isLoggedIn, isNotLoggedIn } = require('./routes/middlewear');

dotenv.config();
const app = express();
passportConfig();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));
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
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/login', isNotLoggedIn, loginRouter);
app.use('/join', isNotLoggedIn, joinRouter);
app.use('/post', isLoggedIn, postRouter);
app.use('/choose', isLoggedIn, chooseRouter);

app.get('/logout', (req, res) => {
    try {
        req.logout();
        req.session.destroy();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.json({ message: "로그아웃 중 오류가 발생했습니다" });
    }
});

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({ message: "server error" });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 대기 중');
});
//