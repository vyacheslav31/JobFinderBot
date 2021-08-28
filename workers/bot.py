import asyncio
import logging
import os
import typing

import discord
from discord.ext import commands
from dotenv import load_dotenv

from .request_manager import RequestManager

#   TODO: Add more job search APIS & subsequently create JSON file with their properties.
#   Currently only supports Job Searching with Adzuna


class JobFinderBot(commands.Bot):
    ADZUNA_REGIONS = {
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
    CMD_PREFIX = "/jf "
    STATIC_MAP_HEIGHT = 100
    STATIC_MAP_WIDTH = 100
    STATIC_MAP_ZOOM = 13
    ADZUNA_NAME = "Adzuna"
    ADZUNA_ICON_URL = "https://i.ibb.co/ryxpxNC/adzuna-logo.png"
    ADZUNA_URL = "https://www.adzuna.com"

    # Format Strings #
    static_map_url = "https://static-maps.yandex.ru/1.x/?lang=en-US" \
                     "&ll={longitude},{latitude}" \
                     "&z={zoom_lvl}" \
                     "&l=map&size={width},{height}"
    map_base_url = "https://www.google.com/maps/search/?api=1" \
                   "&query={latitude},{longitude}"

    logging_format = '[%(asctime)s] %(levelname)s - %(filename)s:%(funcName)s - %(message)s'
    logging.basicConfig(filename='logs/bot.log',
                        datefmt='%d-%b-%y %H:%M:%S',
                        level=logging.INFO,
                        format=logging_format)

    def __init__(self):
        super().__init__(command_prefix=self.CMD_PREFIX)
        load_dotenv()
        self.request_manager = RequestManager()
        self.token = os.getenv('TOKEN')
        self.register_commands()

    async def on_ready(self):
        print("Bot is now active.")

    def format_post(self, post):
        embed = discord.Embed(title=post["Title"],
                              url=post["URL"],
                              color=0x20873c)

        embed.set_author(
            name=self.ADZUNA_NAME,
            url=self.ADZUNA_URL,
            icon_url=self.ADZUNA_ICON_URL
        )

        embed.set_thumbnail(url=self.static_map_url.format(
            longitude=post["Longitude"],
            latitude=post["Latitude"],
            zoom_lvl=self.STATIC_MAP_ZOOM,
            width=self.STATIC_MAP_WIDTH,
            height=self.STATIC_MAP_HEIGHT
        ))
        embed.add_field(name="Map",
                        value=self.map_base_url.format(
                            latitude=post["Latitude"],
                            longitude=post["Longitude"]
                        ),
                        inline=True)
        embed.add_field(name="Company",
                        value=post["Company"],
                        inline=False)
        embed.add_field(name="Location",
                        value=post["Location"],
                        inline=True)
        embed.add_field(name="Post Date",
                        value=post["Post Date"], inline=True)
        embed.add_field(name="Category",
                        value=post["Category"], inline=True)
        embed.add_field(name="Title",
                        value=post["Title"],
                        inline=True)
        embed.add_field(name="Description",
                        value=post["Description"],
                        inline=False)
        return embed

    def register_commands(self) -> None:
        """
        This method registers all the available commands from the bot.
        """

        @self.command(pass_context=True)
        async def post(ctx, query, quantity: typing.Optional[int] = 1):
            channel = ctx.channel
            user = ctx.message.author

            if self.request_manager.user_exists(user.id):
                response = self.request_manager.make_request(
                    user.id, quantity, query)
                message = self.format_post(response)
                await channel.send(embed=message)
                self.request_manager.add_posts(response)
            else:
                await channel.send("You must register first with `/jf register`")

        @self.command(pass_context=True)
        async def register(ctx):
            channel = ctx.channel
            user = ctx.message.author
            register_msg = "Please enter your country by selecting its numerical position on this list\n"
            countries_list = list(self.ADZUNA_REGIONS)

            for i, country in enumerate(countries_list):
                register_msg += f"{i + 1}. {country} \n"

            await channel.send(register_msg)

            def validate_country(country_num):
                try:
                    return 0 <= (int(country_num.content) - 1) < len(countries_list)
                except ValueError:
                    return False

            try:
                user_ctry = await self.wait_for('message', check=validate_country, timeout=10.0)
                user_ctry = self.ADZUNA_REGIONS[countries_list[int(
                    user_ctry.content) - 1]]
                print(user_ctry)

                if not self.request_manager.user_exists(user.id):
                    self.request_manager.add_user(user.id, user_ctry)
                    await channel.send(f"Grats! We've registered {user.name} .")
                else:
                    await channel.send("Sorry. Look's like you're already registered.")
            except asyncio.TimeoutError:
                await channel.send("Timed-out. Please enter your selection within 10s.")

    def turn_on(self) -> None:
        self.run(self.token)
