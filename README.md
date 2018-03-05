# Telegram frontend-news grabber bot

Get latest frontend news from https://frontendfront.com/recent/ right to your chat ✌️

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. You have to obtain telegram bot key from [@BotFather](https://t.me/BotFather).
2. Put bot key in `.env` file like this:
```
BOT_TOKEN=YOUR_BOT_TOKEN
```
3. You're ready to go!

### Installing

Run `yarn` to install project deps.

After that, use
```
npm run dev
```

for development, and

```
npm start
```

for "production" run.


## Built With

* [Telegraf](http://telegraf.js.org/#/) - Modern Telegram bot framework for Node.js
* [Cheerio](https://github.com/cheeriojs/cheerio) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
