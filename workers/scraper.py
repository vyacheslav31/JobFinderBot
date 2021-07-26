from datetime import datetime
import requests
import json
import os
from dotenv import load_dotenv
from storage.db_manager import DatabaseManager
from bs4 import BeautifulSoup as bsoup


class JobScraper():
    _base_url = "http://api.adzuna.com/v1/api/jobs/{country}/search/1?" \
        "app_id={app_id}" \
        "&app_key={app_key}" \
        "&results_per_page={results_qty}"\
        "&what={query}"\
        "&content-type=application/json"

    def __init__(self):
        load_dotenv()
        self.app_id = os.getenv('ADZUNA_APP_ID')
        self.app_key = os.getenv('ADZUNA_APP_KEY')
        dbmanager = DatabaseManager()

    def search(self, country, results_qty, query):
        response = requests.get(self._base_url.format(
            country=country,
            app_id=self.app_id,
            app_key=self.app_key,
            results_qty=results_qty,
            query=query
        ))
        
        obj = json.loads(response.text)
        print(obj["results"][0]["title"])
        print(obj["results"][0]["location"]["display_name"])
