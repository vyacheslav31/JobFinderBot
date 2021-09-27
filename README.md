
![JobFinderBot](https://raw.githubusercontent.com/vyacheslav31/JobFinderBot/main/resources/img/JobFinderBot-02.png)
<p align="center">A discord bot that helps you look for jobs on websites like Indeed and Monster.</p>
<h3 align="center"><i>Work in Progress ...</i></h3>

## Installation
### Requirements
* Adzuna API Credentials [[link]](https://developer.adzuna.com/)
* Discord Bot Token [[link]](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
### Dependencies
* <b>node.js v16</b> : Needed for interacting with DiscordJS v13.
* <b>dotenv</b> : Used for loading credentials from the .env file.
* <b>discord.js</b> : A popular NodeJS Discord API wrapper (https://discord.js.org/#/docs/main/stable/general/welcome).
* <b>axios</b> : Axios is used for making requests to various job search APIs.
* <b>better-sqlite3</b> : Used for producing an in-memory database for fast retrieval of JobPostings and user registration.
#### Note
An `.env` file must be present in the root directory of this project containing your Discord token and API credentials. See `.env.example` in the root directory.
### Getting Started
```
git clone https://github.com/vyacheslav31/JobFinderBot.git
cd JobFinderBot
npm install
```
### Environment
Replace all the `#` with your credentials and choose `production` or `development`
```
ADZUNA_APP_ID=#
ADZUNA_APP_KEY=#
DISCORD_APP_ID=#
DISCORD_APP_KEY=#
CHANNEL=#
TOKEN=#
LOGGING_LVL={development:production}
```
### Running the bot
```
npm run start
```
## About
### Control flow
This is the principal flow of the program and the main way that users will be interacting with bot. Each invocation of the post method follows this sequence diagram.

![jobfinderbot_controlflow_sequence_diagram](https://mermaid.ink/svg/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG5hdXRvbnVtYmVyXG5Vc2VyIC0-PiBEaXNjb3JkOiAvamYgcG9zdFxuTm90ZSBvdmVyIFVzZXIsRGlzY29yZDoge3F1ZXJ5fSx7bG9jYXRpb259LHtxdWFudGl0eX0gXG5EaXNjb3JkLS0pSm9iRmluZGVyQm90OiBpbnZva2UgcG9zdCBtZXRob2RcbkpvYkZpbmRlckJvdC0-PlJlcXVlc3RNYW5hZ2VyOiByZXF1ZXN0IHBvc3Rpbmdcbk5vdGUgb3ZlciBKb2JGaW5kZXJCb3QsUmVxdWVzdE1hbmFnZXI6IHt1c2VyLHJlZ2lvbixxdWFudGl0eSxxdWVyeX1cblJlcXVlc3RNYW5hZ2VyLT4-RGF0YWJhc2VNYW5hZ2VyOiBjaGVjayBkYiBcbmFsdCBwb3N0IGluIGRiXG5cdERhdGFiYXNlTWFuYWdlci0tPj5Kb2JGaW5kZXJCb3Q6IHJldHVybiBleGlzdGluZyBwb3N0aW5nXG5lbHNlIHBvc3Qgbm90IGluIGRiXG5cdFJlcXVlc3RNYW5hZ2VyLSlTY3JhcGVyOiByZXF1ZXN0IG5ldyBwb3N0aW5nXG5cdGFsdCBtYXRjaCBmb3VuZFxuXHRcdFNjcmFwZXItLSlEYXRhYmFzZU1hbmFnZXI6IHNhdmUgbmV3IHBvc3Rpbmdcblx0XHROb3RlIG92ZXIgU2NyYXBlcixEYXRhYmFzZU1hbmFnZXI6IHN0b3JlIHNlYXJjaCBxdWVyeSArIHJlc3VsdFxuXHRcdERhdGFiYXNlTWFuYWdlci0tKUpvYkZpbmRlckJvdDogcmV0dXJuIG5ldyBwb3N0aW5nXG5cdGVsc2UgbWF0Y2ggbm90IGZvdW5kXG5cdFx0U2NyYXBlci0tPj5Kb2JGaW5kZXJCb3Q6IGNvdWxkbid0IGZpbmQgYW55dGhpbmdcblx0ZW5kXG5lbmRcbkpvYkZpbmRlckJvdC0tKVVzZXI6IGZvcm1hdCAmIGRpc3BsYXkgcG9zdGluZ1xuTm90ZSBvdmVyIEpvYkZpbmRlckJvdCxVc2VyOiBEaXNjb3JkRW1iZWQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGFyayJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6dHJ1ZX0)

## Support
I maintain this repository for free, if you find it in your ❤️ to support me, 🌟 this repo.

## License
<i>MIT License

Copyright (c) 2021 Vyacheslav Gorbov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</i>
