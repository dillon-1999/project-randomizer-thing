"use strict";

const express = require("express");
const app = express();
const path = require("path");
const PORT = 8005;
const multer = require('multer');
const redis = require('redis');
const session = require('express-session');
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: "somethingSecret", // TODO: place somewhere else
    resave: false,
    saveUninitialized: false,
    name: "session", // now it is just a generic name
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 8 // 8 hours
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

let upload = multer({storage});

//route to ejs?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

// routers to each controller
const usersRouter = require("./Controllers/UserController");
const projectsRouter = require("./Controllers/ProjectController");
const openProjectsRouter = require("./Controllers/OpenProjectsController");

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"), {
    extensions: ['html'],
}));
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/openProjects', openProjectsRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});