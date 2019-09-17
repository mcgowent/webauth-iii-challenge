const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);

const UsersRouter = require('./users/usersRouter.js');  //This should route to whatever Route you are setting
const AuthRouter = require('./auth/authRouter.js');
const knexConnection = require('./data/db-config')

const server = express();

const sessionConfig = {
    name: 'monkey', // sid
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 300, // 300 seconds
        secure: false, // TRUE in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    store: new KnexSessionStore({
        knex: knexConnection,
        createtable: true,
        clearInterval: 1000 * 60 * 30, // How long before expired sessions delete: 30 mins
    })
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);


module.exports = server;