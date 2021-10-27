const Database = require('better-sqlite3');
const fs = require("fs");
const path = require("path");
const dbStatements = require('./db_statements');

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
            for (const statement of dbStatements) {
                let preparedStatement = this.db.prepare(statement);
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

    test(userId, country) {
        console.log(userId);
        console.log(country);
    }


}

module.exports = DatabaseManager;