const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./config/db');
const { Mongoose } = require('mongoose');

const errorController = require('./controllers/error');

dotenv.config({ path: './config/config.env' });

require('./config/passport')(passport)

connectDB();

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/songs', require('./routes/songs'));
app.use('/auth', require('./routes/auth'));

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server mode: ${process.env.NODE_ENV}, port: ${PORT}`));