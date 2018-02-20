declare let process: any;
declare let require: any;

//https://github.com/zeit/now-cli/issues/431

const prettyjson = require('prettyjson');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Telegram = require('telegraf/telegram');
const _random = require('lodash.random');
import * as cheerio from 'cheerio';
import * as request from 'request';
import * as fs from 'fs';

require('dotenv').config();

const helpMd = fs.readFileSync('./help.md', 'utf-8').toString();

const URL = 'https://frontendfront.com/recent/';
const ERROR_STRING = `Ooops! I can't help you right now 😕`;

const telegram = new Telegram(process.env.BOT_TOKEN);
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log('Response time %sms', ms)
});

bot.command('help', (ctx) => ctx.replyWithMarkdown(helpMd));
bot.command('start', (ctx) => ctx.replyWithMarkdown(helpMd));

bot.command('latest', (ctx: any) => {
    request(URL, (error: any, response: any, html: any) => {
        if (error) {
            ctx.reply(ERROR_STRING);
        }

        const $ = cheerio.load(html);
        const links = $(`.stories-list .story-link`);

        const randomIdx = _random(0, links.length);
        const link = $(links.get(randomIdx));

        if (!link.text() || !link.attr('href')) {
            return ctx.reply(ERROR_STRING);
        }

        const reply = `Hey! A new story is here:\n\n${link.text()} ${link.attr('href')}`;

        ctx.reply(reply);
    });
});

bot.hears('hi', (ctx) => ctx.reply('Hey there!'));
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.startPolling();

console.log('Bot started!');