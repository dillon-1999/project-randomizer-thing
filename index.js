"use strict";

const express = require("express");
const app = express();

// routers to each controller
const usersRouter = require("./Controllers/UserController");
const projectsRouter = require("./Controllers/ProjectController");
const openProjectsRouter = require("./Controllers/OpenProjectsController");

const PORT = 8005;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/openProjects', openProjectsRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});