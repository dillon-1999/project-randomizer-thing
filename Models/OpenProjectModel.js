"use strict";
const { db } = require("./db");

class OpenProjectsModel {
    constructor (db)
    {
        this.db = db;
    }

    createOpenProject (openProject)
    {
        try
        {
            const sql = `
                INSERT INTO OpenProjects
                    (openID, project, author, startedOn)
                VALUES
                    (openID, project, author, startedOn)`;
            const stmt = db.prepare(sql);

            openProject.openID = uuidV4();
            openProject.startedOn = Date.now();

            stmt.run(openProject);
            return true;
        }
        catch
        {
            console.error(err);
            return false;
        }
    }

    findProjectsByUser (userID)
    {
        try 
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE author = @userID`;
            const stmt = db.prepare(sql);
            return stmt.all({userID});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    //Find projects by the ProjectID (not OpenID)
    findProjectsByProjectID (project)
    {
        try
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE projectID = @projectID`;
            const stmt = db.prepare(sql);
            return stmt.all({projectID: project.projectID}) //Check this specifically
        }
        catch (err)
        {
            console.error(err)
            return false;
        }
    }

    findFinishedProjects ()
    {
        try
        {
            const sql = `
                SELECT *
                FROM OpenProjects
                WHERE isFinished = 0`;
            const stmt = db.prepare(sql);
            return stmt.all();
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    markProjectAsFinished (openID)
    {
        try
        {
            const sql = `
                UPDATE OpenProjects
                SET 
                    finishedOn = @date,
                    isFinished = 1
                WHERE openID = @openID`;
            const stmt = db.prepare(sql);
            const date = Date.now();

            stmt.run({date, openID});
            return true;            
        }
        catch
        {
            console.error();
            return false;
        }
    }


}