from storage.db_manager import DatabaseManager
from .scraper import JobScraper

class RequestManager():

    def __init__(self) -> None:
        self.db_manager = DatabaseManager()
        self.scraper = JobScraper()