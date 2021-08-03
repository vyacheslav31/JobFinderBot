from storage.db_manager import DatabaseManager
from .scraper import JobScraper
import discord


class RequestManager():
    # Google Maps Format Query
    # https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
    def __init__(self) -> None:
        self.db_manager = DatabaseManager()
        self.scraper = JobScraper()

    def make_request(self, rgn, qty, qry):
        if qty == 1:
            response = self.scraper.get_jobs(rgn, qty, qry)
            embed = discord.Embed(title=response["Title"],
                                  url=response["URL"],
                                  color=0x20873c)
            embed.set_author(
                name="Adzuna",
                url="https://www.adzuna.com",
                icon_url="https://i.ibb.co/ryxpxNC/adzuna-logo.png"
            )
            embed.set_thumbnail(
                url=f"https://static-maps.yandex.ru/1.x/?lang=en-US&ll={response['Longitude']},{response['Latitude']}&z=13&l=map&size=100,100")
            embed.add_field(name="Map",
                            value=f"[Click Here](https://www.google.com/maps/search/?api=1&query={response['Latitude']},{response['Longitude']})",
                            inline=True)
            embed.add_field(name="Company",
                            value=response["Company"],
                            inline=False)
            embed.add_field(name="Location",
                            value=response["Location"],
                            inline=True)
            embed.add_field(name="Post Date",
                            value=response["Post Date"], inline=True)
            embed.add_field(name="Category",
                            value=response["Category"], inline=True)
            embed.add_field(name="Title",
                            value=response["Title"],
                            inline=True)
            embed.add_field(name="Description",
                            value=response["Description"],
                            inline=False)
            return embed
        elif 1 < qty <= 5:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="Still currently "
                                                                                         "implementing multi-search")
        else:
            return discord.Embed(title="Quantity Error").add_field(name='Message', value="You may only request "
                                                                                         "between 1 and 5 job "
                                                                                         "postings.")

    def __cron_search(self):
        return None
