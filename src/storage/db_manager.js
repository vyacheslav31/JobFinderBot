const Database = require('better-sqlite3');
const fs = require("fs");

class DatabaseManager {
    constructor() {
        this.db = new Database(":memory:", {verbose: console.log});
        this.setupDb();
    }

    setupDb() {
        try {
            let statements = JSON.parse(fs.readFileSync('statements.json'));

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
}

module.exports = DatabaseManager;