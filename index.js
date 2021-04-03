"use strict";

const express = require("express");
const app = express();

// routers to each controller
const usersRouter = require("./Controllers/UserController");
const projectsRouter = require("./Controllers/ProjectController");
const openProjectsRouter = require("./Controllers/OpenProjectsController");

const path = require("path");
const PORT = 8005;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/openProjects', openProjectsRouter);

app.use(express.static(path.join(__dirname, "public"), {
    extensions: ['html'],
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});