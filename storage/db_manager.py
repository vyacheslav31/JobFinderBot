import logging
import sqlite3
from sqlite3 import OperationalError


class DatabaseManager:

    def __init__(self):
        self.conn = sqlite3.connect(":memory:")
        self.cursor = self.conn.cursor()
        self.setup_db()

    def trim_db(self):
        """Used for periodically trimming DB size to prevent memory overuse / overflow."""
        pass

    def insert_posts(self, posts):
        for post in posts:
            self.cursor.execute("INSERT INTO job_postings VALUES (:id, :parent_search_id, :title, :company, "
                                ":description, "
                                ":location, :post_date, :latitude, :longitude, :url, :category);",
                                {
                                    'id': post["ID"],
                                    'title': post['Title'],
                                    'company': post["Company"],
                                    'description': post['Description'],
                                    'location': post["Location"],
                                    'post_date': post["Post Date"],
                                    'latitude': post["Latitude"],
                                    'longitude': post["Longitude"],
                                    'url': post["URL"],
                                    'category': post["Category"]
                                }
                                )

    def insert_user(self, user_id, country):
        self.cursor.execute("INSERT INTO users VALUES (:user_id, :country);", {
            'user_id': user_id,
            'country': country
        })

    def get_user_region(self, user_id):
        self.cursor.execute(
            f"SELECT country FROM users WHERE user_id = {user_id};")

    def insert_searches(self):
        pass

    def get_posts(self):
        pass

    def user_exists(self, user_id):
        return self.cursor.execute(f"SELECT EXISTS(SELECT 1 FROM users WHERE user_id={user_id} LIMIT 1);").fetchone()[0]

    def setup_db(self):
        try:
            self.cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                  user_id integer PRIMARY KEY,
                  country text
                );
                """
            )

            self.cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS searches (
                    search_id integer PRIMARY KEY AUTOINCREMENT,
                    keywords text
                    );
                """
            )

            self.cursor.execute(
                """CREATE TABLE IF NOT EXISTS job_postings (
                id integer PRIMARY KEY,
                parent_search_id integer NOT NULL,
                title text,
                company text,
                description text,
                location text,
                post_date text,
                latitude text,
                longitude text,
                url text,
                category text,
                
                FOREIGN KEY(parent_search_id) REFERENCES searches(search_id)
                );""")

            self.cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS user_post_views (
                  user_id integer NOT NULL,
                  job_post_id integer NOT NULL,
                  FOREIGN KEY(user_id) REFERENCES users(user_id),
                  FOREIGN KEY(job_post_id) REFERENCES job_postings(id)
                );
                """
            )
        except OperationalError as ex:
            logging.exception(ex)
