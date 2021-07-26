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
                )"""
        )

        cursor.execute("""CREATE TABLE IF NOT EXISTS job_postings (
            id integer PRIMARY KEY,
            title text,
            company text,
            location text,
            post_date text,
            latitude text,
            longitude text,
            url text
            )""")
        pass
