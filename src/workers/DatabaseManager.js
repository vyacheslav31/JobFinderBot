const Database = require('better-sqlite3');
const { exit } = require('process');
const dbStatements = require('../storage/DatabaseStatements');

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
            let preparedStmt = this.db.prepare(dbStatements.transactions.insertNewUser);
            preparedStmt.run(userId + '', country);
        }
        catch (SqliteError) {
            if (!this.db.inTransaction) {
                // TODO: LOG SQL ERROR
                console.log(SqliteError);

            }
        }
    }

    async insertPosts(posts, searchTerm) {
        // Insert Search Term
        const searchId = this.insertSearch(searchTerm);
        // Extract Post Data & replace undefined values with 'Unknown's
        for (const post in posts) {
            const postData = [
                post.id,
                searchId,
                post.title,
                typeof post.redirect_url !== 'undefined' ? post.redirect_url : 'Unknown',
                typeof post.longitude !== 'undefined' ? post.longitude : 'Unknown',
                typeof post.latitude !== 'undefined' ? post.latitude : 'Unknown',
                typeof post.company.display_name !== 'undefined' ? post.company.display_name : 'Unknown',
                typeof post.location.display_name !== 'undefined' ? post.location.display_name : 'Unknown',
                typeof post.created !== 'undefined' ? post.created : 'Unknown',
                typeof post.category.label !== 'undefined' ? post.category.label : 'Unknown',
                typeof post.description !== 'undefined' ? post.description : 'Unknown',
            ];
        }
    }

    insertSearch(searchTerm) {
        try {
            console.log(this.db.prepare(dbStatements.transactions.insertSearch).run(searchTerm + ''));
            process.exit();
        }
        catch (SqliteError) {
            if (!this.db.inTransaction) {
                // TODO: LOG SQL ERROR
                console.log(SqliteError);

            }
        }
    }

    getUserRegion(userId) {
        try {
            return this.db.prepare(dbStatements.transactions.getUserRegion).get(userId + '').country;
        }
        catch (SqliteError) {
            if (!this.db.inTransaction) {
                // TODO: LOG SQL ERROR
                console.log(SqliteError);

            }
        }
    
    }

    userExists(userId) {
        try {
            return this.db.prepare(dbStatements.transactions.userExists).get(userId);
        }
        catch (except) {
            if (!this.db.inTransaction) {
                // TODO: LOG SQL ERROR
                throw except;
            }
        }
    }


}

module.exports = DatabaseManager;