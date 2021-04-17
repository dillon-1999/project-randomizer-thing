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
            stmt.run(project);

            return true;
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    deleteProject(projectID){
        try{
            const sql = `DELETE FROM Projects
                         WHERE
                            projectID=@projectID`;
            return db.prepare(sql).run({projectID});
        } catch(err){
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
            return db.prepare(sql).all({difficulty});
        }
        catch (err)
        {
            console.error(err);
            return false;
        }
    }

    modifyDescription(description, projectID){
        try {
            const sql = `UPDATE Projects
                         SET
                            description = @description
                         WHERE
                            projectID = @projectID
                        `;
            return db.prepare(sql).run({description, projectID});
        } catch (err){
            console.error(err);
            return false;
        }
    }

    modifyName(name, projectID){
        try {
            const sql = `UPDATE Projects
                         SET
                            name = @name
                         WHERE
                            projectID = @projectID
                        `;
            return db.prepare(sql).run({name, projectID});
        } catch (err){
            console.error(err);
            return false;
        }
    }

    modifyDifficulty(difficulty, projectID){
        try {
            const sql = `UPDATE Projects
                         SET
                            difficulty = @difficulty
                         WHERE
                            projectID = @projectID
                        `;
            return db.prepare(sql).run({difficulty, projectID});
        } catch (err){
            console.error(err);
            return false;
        }
    }
    getProjects(){
        try{
            const sql = `SELECT * FROM Projects`;
            return db.prepare(sql).all();
        } catch (err){
            console.error(err);
            return false;
        }
    }
}
let p = new ProjectsModel(db);
// p.createProject({name: "uno", description: "this is uno", difficulty: 3});
p.deleteProject('b81e6cab-228d-482f-b482-a6ce5f881808');
console.log(p.getProjects())
exports.projectModel = new ProjectsModel(db);