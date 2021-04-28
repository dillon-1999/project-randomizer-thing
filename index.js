"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = 8005;
const redis = require('redis');
const session = require('express-session');
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();
const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    // TODO ? more like to DID
    secret: process.env.COOKIE_SECRET, // TODO: place somewhere else
    resave: false,
    saveUninitialized: false,
    name: "session", // now it is just a generic name
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 8 // 8 hours
    }
};

// routers to each controller
const usersRouter = require("./Controllers/UserController");
const projectsRouter = require("./Controllers/ProjectController");
const openProjectsRouter = require("./Controllers/OpenProjectsController");
app.set('view engine', 'ejs');
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"), {
    extensions: ['html'],
}));

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/openProjects', openProjectsRouter);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});