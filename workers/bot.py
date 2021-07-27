from discord import channel
from .request_manager import RequestManager
from discord.ext import commands
from dotenv import load_dotenv
import os

class JobFinderBot(commands.Bot):
    cmd_prefix = "/jf "
    
    def __init__(self):
        super().__init__(command_prefix=self.cmd_prefix)
        load_dotenv()
        self.channel = self.get_channel(int(os.getenv('CHANNEL')))
        self.request_manager = RequestManager()
        self.token = os.getenv('TOKEN')
        self.register_commands()

    async def on_ready(self):
        print("Bot is now active.")
    
    def register_commands(self):
        @self.command(pass_context=True)
        async def job(ctx):
            message = self.request_manager.make_request()
            await ctx.channel.send(embed=message)
    
    def turn_on(self):
        self.run(self.token)
        
    