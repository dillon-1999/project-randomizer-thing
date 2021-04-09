CREATE TABLE IF NOT EXISTS Users (
    userID TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    role INTEGER DEFAULT 0, -- default to "user" role
    email TEXT UNIQUE NOT NULL,
    didVerifyEmail BOOLEAN DEFAULT 0 -- defaults to unverified
);

-- a db full of projects topics
CREATE TABLE IF NOT EXISTS Projects (
    projectID TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT, -- changed to description for clarity
    difficulty TEXT NOT NULL DEFAULT 0 -- 0,1,2 : beginner, medium, hard
);

-- db full of open projects by users
CREATE TABLE IF NOT EXISTS OpenProjects (
    openID  TEXT PRIMARY KEY,
    project TEXT, -- projectID
    author TEXT,
    startedOn TEXT NOT NULL,
    finishedOn TEXT DEFAULT NULL, -- null until finished
    isFinished BOOLEAN DEFAULT 0,
    fileHash TEXT DEFAULT NULL, -- for when submitted
    FOREIGN KEY (project) REFERENCES Projects(projectID),
    FOREIGN KEY (author) REFERENCES Users(userID)
);
