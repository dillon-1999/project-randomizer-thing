"use strict";
const { db } = require("./db");
const uuidV4 = require('uuid').v4;

class ProjectsModel {
    constructor (db)
    {
        this.db = db;
    }

    createProject (project)
    {
        try {
            const sql = `
                INSERT INTO Projects
                    (projectID, name, description, difficulty)
                VALUES
                    (@projectID, @name, @description, @difficulty)`;
            const stmt = db.prepare(sql);

            project.projectID = uuidV4();
            stmt.run(project)

            return true;
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    findProjectByProductID (productID)
    {
        try
        {
            const sql = `
                SELECT *
                FROM Projects
                WHERE productID = @productID`;
            const stmt = db.prepare(sql);
        
            return stmt.all({productID});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }
    
    findProjectsByDifficulty (difficulty)
    {
        try
        {
            const sql = `
                SELECT *
                FROM Projects
                WHERE difficulty = @difficulty`;
            const stmt = db.prepare(sql);
        
            return stmt.all({difficulty});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }


}