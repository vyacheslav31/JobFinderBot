import sqlite3
import os
from pathlib import Path


class DatabaseManager():

    def __init__(self):
        conn = sqlite3.connect('storage/registry.db')
        cursor = conn.cursor()

        #================#
        # SETUP DATABASE #
        #================#
        cursor.execute(
            """CREATE TABLE IF NOT EXISTS users (
                id integer PRIMARY KEY,
                name text NOT NULL,
                country text
                );"""
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS searches (
                search_id integer PRIMARY KEY,
                keywords text,
                
                );
            """
        )

        cursor.execute("""CREATE TABLE IF NOT EXISTS job_postings (
            id integer PRIMARY KEY,
            parent_search_id integer NOT NULL,
            title text,
            company text,
            location text,
            post_date text,
            latitude text,
            longitude text,
            url text,
            category text
            
            FOREIGN KEY(parent_search_id) REFERENCES searches(search_id)
            );""")

        pass
    
    def trim_db(self):
        """Used for chronologically trimming DB size to prevent overuse"""
        pass
