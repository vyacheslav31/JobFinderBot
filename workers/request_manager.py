import discord

from storage.db_manager import DatabaseManager
from .scraper import JobScraper


# NOTE: So far this class seems rather redundant. Might have to refactor
# all the functionality in this class into one of the other workers.


class RequestManager:

    def __init__(self) -> None:
        self.db_manager = DatabaseManager()
        self.scraper = JobScraper()

    def make_request(self, user_id, qty, qry):
        if qty == 1:
            region = self.db_manager.get_user_region(user_id)
            return self.scraper.get_jobs(region, qty, qry)
        elif 1 < qty <= 5:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="Still currently "
                                                                                         "implementing multi-search")
        else:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="You may only request "
                                                                                         "between 1 and 5 job "
                                                                                         "postings.")

    def add_posts(self, posts):
        self.db_manager.insert_posts(posts)

    def add_user(self, user_id, country):
        self.db_manager.insert_user(user_id, country)

    def post_obtainable_from_db(self):
        pass

    def user_exists(self, user_id):
        return self.db_manager.user_exists(user_id)
