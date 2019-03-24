declare let process: any;
declare let require: any;

//https://github.com/zeit/now-cli/issues/431

const prettyjson = require('prettyjson');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Telegram = require('telegraf/telegram');
import * as fs from 'fs';
import { BotContext } from './interfaces';
import { Parser } from './parser';

const helpMd = fs.readFileSync(`${__dirname}/../help.md`, 'utf-8').toString();

const URL = 'https://frontendfront.com/recent/';
const ERROR_STRING = `Ooops! I can't help you right now 😕`;

const telegram = new Telegram(process.env.BOT_TOKEN);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx: BotContext, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log('Response time %sms', ms)
});

bot.command('help', (ctx: BotContext) => ctx.replyWithMarkdown(helpMd));
bot.command('start', (ctx: BotContext) => {
    ctx.replyWithMarkdown(helpMd)
    console.log(JSON.stringify(ctx.message, null, 2));
});

bot.command('latest', async (ctx: any) => {
    const reply = await Parser.parse(URL);
    ctx.reply(reply);
});

bot.hears('hi', (ctx: BotContext) => ctx.reply('Hey there!'));
bot.hears(/buy/i, (ctx: BotContext) => ctx.reply('Buy-buy!'));
bot.on('sticker', (ctx: BotContext) => ctx.reply('👍'));

export default bot;