const Database = require('better-sqlite3');
const fs = require("fs");
const path = require("path");
const { exit } = require('process');
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
            for (const statement of dbStatements.dbCreation) {
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
    trimDb() {

    }

    insertUser(userId, country) {
        try {
            let preparedStmt = this.db.prepare(dbStatements.transactions.insertNewUser(userId, country));
            preparedStmt.run();
        }
        catch (except) {
            if (!this.db.inTransaction) {
                // TODO: LOG SQL ERROR
                throw except;
            }
        }
    }

    insertPost(post) {

    }

    getUserRegion(userId) {

    }

    userExists(userId) {

    }


}

module.exports = DatabaseManager;