module.exports = {
        dbCreation : [
                createUsersTable = "CREATE TABLE IF NOT EXISTS users ( user_id integer PRIMARY KEY, country text );",
                createSearchesTable = "CREATE TABLE IF NOT EXISTS searches ( search_id integer PRIMARY KEY AUTOINCREMENT, keywords text );",
                createJobPostingsTable = "CREATE TABLE IF NOT EXISTS job_postings ( id integer PRIMARY KEY, parent_search_id integer NOT NULL, title text, company text, description text, location text, post_date text, latitude text, longitude text, url text, category text, FOREIGN KEY(parent_search_id) REFERENCES searches(search_id) );",
                createPostViewsTable = "CREATE TABLE IF NOT EXISTS user_post_views ( user_id integer NOT NULL, job_post_id integer NOT NULL, FOREIGN KEY(user_id) REFERENCES users(user_id), FOREIGN KEY(job_post_id) REFERENCES job_postings(id) );",
        ],
        transactions : {
                insertNewUser : 'INSERT INTO users VALUES (?, ?);',
                insertJobPost : 'INSERT INTO job_postings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                getUserRegion : 'SELECT country FROM users WHERE user_id = ?',
                userExists : 'SELECT EXISTS(SELECT 1 FROM users WHERE user_id = ? LIMIT 1);'
        }
}