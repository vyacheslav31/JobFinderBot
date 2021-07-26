import discord
from discord import channel
from discord.ext.commands import bot
from .scraper import JobScraper
from discord.ext import commands, tasks
from dotenv import load_dotenv
import os

class JobFinderBot():
    client = commands.Bot(command_prefix="/jfb ")
    
    def __init__(self):
        load_dotenv()
        self.channel = self.client.get_channel(int(os.getenv('CHANNEL')))
        self.scraper = JobScraper()
        self.token = os.getenv('TOKEN')
        
        
    @client.event
    async def on_ready():
        print("Bot is now active.")
        
    @client.command(pass_context=True)
    async def job(self, *args):
        await self.channel.send(content="Hello")
    
    def start(self):
        self.client.run(self.token)
        
    