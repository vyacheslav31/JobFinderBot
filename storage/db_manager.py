import sqlite3
from sqlite3 import OperationalError
import json
import logging


class DatabaseManager():

    def __init__(self):
        self.conn = sqlite3.connect(":memory:")
        self.cursor = self.conn.cursor()
        self.setup_db()

    def trim_db(self):
        """Used for periodically trimming DB size to prevent memory overuse / overflow."""
        pass
    def insert_posts(self):
        pass
    def insert_user(self):
        pass
    def insert_searches(self):
        pass
    def get_posts(self):
        pass
    def user_exists(self):
        pass
    def setup_db(self):
        try:
            self.user_file = open('storage/users.json', 'r+')
            self.cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS searches (
                    search_id integer PRIMARY KEY,
                    keywords text
                    );
                """
            )

            self.cursor.execute("""CREATE TABLE IF NOT EXISTS job_postings (
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
        except OperationalError as ex:
            logging.exception(ex)
        
    
    
    
