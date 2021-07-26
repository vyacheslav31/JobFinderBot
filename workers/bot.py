import discord
from .scraper import JobScraper

class JobFinderBot():
    
    def __init__(self):
        self.scraper = JobScraper()
        self.scraper.search('ca', '20', 'software%20developer')
    