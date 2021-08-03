from .request_manager import RequestManager
from discord.ext import commands
from dotenv import load_dotenv
import os
import logging
import typing

available_regions = \
    {
        "Great Britain": "gb",
        "Austria": "at",
        "Australia": "au",
        "Brazil": "br",
        "Canada": "ca",
        "Germany": "de",
        "France": "fr",
        "India": "in",
        "Italy": "it",
        "Netherlands": "nl",
        "New Zealand": "nz",
        "Poland": "pl",
        "Russia": "ru",
        "Singapore": "sg",
        "United States": "us",
        "South Africa": "za"
    }


class JobFinderBot(commands.Bot):
    cmd_prefix = "/jf "
    logging_format = '[%(asctime)s] %(levelname)s - %(filename)s:%(funcName)s - %(message)s'
    logging.basicConfig(filename='logs/bot.log',
                        datefmt='%d-%b-%y %H:%M:%S',
                        level=logging.INFO,
                        format=logging_format)

    def __init__(self):
        super().__init__(command_prefix=self.cmd_prefix)
        load_dotenv()
        self.request_manager = RequestManager()
        self.token = os.getenv('TOKEN')
        self.register_commands()

    async def on_ready(self):
        print("Bot is now active.")

    def register_commands(self) -> None:
        """
        This method registers all the available commands from the bot.
        """

        @self.command(pass_context=True)
        async def post(ctx, region, query, quantity: typing.Optional[int] = 1):
            """
            Request up to 5 postings. Example usage: `/jf post 2`
            """
            message = self.request_manager.make_request(
                region, quantity, query)
            await ctx.channel.send(embed=message)

        @self.command(pass_context=True)
        async def register(ctx):
            pass

    def turn_on(self) -> None:
        self.run(self.token)
