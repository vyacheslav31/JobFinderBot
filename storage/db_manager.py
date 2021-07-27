import sqlite3
import os
from pathlib import Path
from sqlite3 import OperationalError
import logging


class DatabaseManager():
    logging_format = '[%(asctime)s] %(levelname)s - %(filename)s:%(funcName)s - %(message)s'
    logging.basicConfig(filename='logs/db.log',
                        datefmt='%d-%b-%y %H:%M:%S',
                        level=logging.INFO,
                        format=logging_format)

    def __init__(self):
        conn = sqlite3.connect('storage/registry.db')
        cursor = conn.cursor()

        try:
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
                    keywords text
                    );
                """
            )

            cursor.execute("""CREATE TABLE IF NOT EXISTS job_postings (
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

    def trim_db(self):
        """Used for periodically trimming DB size to prevent storage overuse."""
        pass
