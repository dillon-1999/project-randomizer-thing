CREATE TABLE IF NOT EXISTS Users (
    userID TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    role INTEGER DEFAULT 0, -- default to "user" role
    email TEXT UNIQUE NOT NULL,
    didVerifyEmail BOOLEAN DEFAULT 0 -- defaults to unverified
);

CREATE TABLE IF NOT EXISTS Projects (
    projectID TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    desc TEXT,
    difficulty TEXT NOT NULL DEFAULT 0 -- 0,1,2 : beginner, medium, hard
);

CREATE TABLE IF NOT EXISTS OpenProjects (
    openID  TEXT PRIMARY KEY,
    project TEXT,
    author TEXT,
    startedOn TEXT NOT NULL,
    finishedOn TEXT DEFAULT NULL, -- null until finished
    isFinished BOOLEAN DEFAULT 0,
    fileHash TEXT DEFAULT NULL, -- for when submitted
    FOREIGN KEY (project) REFERENCES Projects(projectID),
    FOREIGN KEY (author) REFERENCES Users(userID)
);
