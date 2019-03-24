require('dotenv').config();

import bot from './bot';

bot.startPolling();

console.log('Bot started!');