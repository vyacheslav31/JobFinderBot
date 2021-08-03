import discord

from storage.db_manager import DatabaseManager
from .scraper import JobScraper


class RequestManager:

    def __init__(self) -> None:
        self.db_manager = DatabaseManager()
        self.scraper = JobScraper()

    def make_request(self, rgn, qty, qry):
        if qty == 1:
            return self.scraper.get_jobs(rgn, 1, qry)
        elif 1 < qty <= 5:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="Still currently "
                                                                                         "implementing multi-search")
        else:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="You may only request "
                                                                                         "between 1 and 5 job "
                                                                                         "postings.")

    def __cron_search(self):
        return None

    def add_posts(self, posts):
        self.db_manager.insert_posts(posts)
