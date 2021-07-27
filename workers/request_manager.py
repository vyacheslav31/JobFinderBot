from storage.db_manager import DatabaseManager
from .scraper import JobScraper
import discord

class RequestManager():

    def __init__(self) -> None:
        self.db_manager = DatabaseManager()
        self.scraper = JobScraper()
        
    def make_request(self):
        response = self.scraper.get_jobs('ca', '1', 'software developer')
        embed = discord.Embed(title=response["Title"],
                            url=response["URL"],
                            color=0x542d7c)
        embed.set_author(
            name="Adzuna",
            url="https://www.adzuna.com",
            icon_url=
            "https://i.ibb.co/ryxpxNC/adzuna-logo.png"
        )
        embed.add_field(name="Company",
                        value=response["Company"],
                        inline=False)
        embed.add_field(name="Location",
                        value=response["Location"],
                        inline=True)
        embed.add_field(name="Post Date", value=response["Post Date"], inline=True)
        embed.add_field(name="Category", value=response["Category"], inline=True)
        embed.add_field(name="Title",
                        value=response["Title"],
                        inline=True)
        embed.add_field(name="Description",
                        value=response["Description"],
                        inline=False)

        return embed
        
        