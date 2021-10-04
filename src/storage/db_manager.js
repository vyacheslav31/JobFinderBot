const Database = require('better-sqlite3');
const fs = require("fs");
const path = require("path");

class DatabaseManager {
    constructor() {
        this.db = new Database(":memory:", { verbose: console.log });
        this.setupDb();
    }

    /**
     * Executes all the statements required for setting up the database
     */
    setupDb() {
        try {
            let statements = JSON.parse(fs.readFileSync(path.join(__dirname, "db_statements.json")));

            for (const statement in statements) {
                let preparedStatement = this.db.prepare(statements[statement]);
                preparedStatement.run();
            }
        }
        catch (except) {
            if (!this.db.inTransaction) {
                throw except;
            }
        }
    }

    /**
     * Used for periodically trimming DB size to prevent memory overuse.
     */
    trimDm() {

    }

    insertUser(userId, country) {

    }

    getUserRegion(userId) {

    }

    userExists(userId) {
        
    }


}

module.exports = DatabaseManager;