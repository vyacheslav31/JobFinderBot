from datetime import datetime
import requests
import json
import os
from storage.db_manager import DatabaseManager
from bs4 import BeautifulSoup as bsoup
from dotenv import load_dotenv

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

    def user_search(self, country, results_qty, query):
        """
        User initiated API search will return the results based on their query.
        """
        response = requests.get(self._base_url.format(
            country=country,
            app_id=self.app_id,
            app_key=self.app_key,
            results_qty=results_qty,
            query=query
        ))
        
        results = json.loads(response.text)["results"]
        job_posts = []
        
        # Convert data from JSON to <list>
        for result in results:
            job_post = {
                "ID": result["id"],
                "Title": result["title"],
                "Company": result["company"]["display_name"],
                "Location": result["location"]["display_name"],
                "Post Date": result["created"],
                "Latitude": result["latitude"],
                "Longitude": result["longitude"],
                "URL": result["redirect_url"],
                "Category": result["category"]["label"]
            }
            job_posts.append(job_post)
            
        return job_posts

        
    def __cron_search(self):
        """
        Application-iniated search which will fill the database preemptively to minimize API calls.
        """
        return None
        
