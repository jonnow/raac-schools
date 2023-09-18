/**
 * Module handles database management
 *
 * The sample data is for a chat log with one table:
 * Messages: id + message text
 */

const fs = require("fs");
const dbFile = "./.data/analytics.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

//SQLite wrapper for async / await connections https://www.npmjs.com/package/sqlite
dbWrapper
    .open({
        filename: dbFile,
        driver: sqlite3.Database
    })
    .then(async dBase => {
        db = dBase;

        try {
            if (!exists) {
                await db.run(
                    "CREATE TABLE Analytics (id INTEGER PRIMARY KEY AUTOINCREMENT, method TEXT, url TEXT, lang TEXT, userAgent TEXT, timestamp TEXT)"
                );
            }
            //console.log(await db.all("SELECT * from Analytics"));
        } catch (dbError) {
            console.error(dbError);
        }
    });

module.exports = {
    // Add new message
    addVisit: async user => {
        let success = false;
        try {
            success = await db.run(`INSERT INTO Analytics (method, url, lang, userAgent, timestamp) VALUES ('${user.method}', '${user.url}', '${user.lang}', '${user.userAgent}', '${user.timestamp}')`);
        } catch (dbError) {
            console.error(dbError);
        }
        return success.changes > 0 ? true : false;
    },
}