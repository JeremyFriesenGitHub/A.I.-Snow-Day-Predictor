//constants

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.db'); 

//create database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;

//init db tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Admin (
        AId INTEGER PRIMARY KEY,
        Username TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS GuestUser (
        GUId INTEGER PRIMARY KEY,
        Username TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Feedback (
        FId INTEGER PRIMARY KEY,
        Text TEXT NOT NULL,
        Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Historical_Data (
        HId INTEGER PRIMARY KEY,
        Date TEXT NOT NULL,
        Temperature FLOAT,
        Wind_Chill INTEGER,
        Visibility FLOAT,
        Rain FLOAT,
        Snow FLOAT,
        Snow_On_Ground INTEGER,
        Outcome INTEGER NOT NULL
    )`);
});
