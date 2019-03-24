declare let process: any;

//https://github.com/zeit/now-cli/issues/431
import Telegraf from 'telegraf';
import * as fs from 'fs';
import * as ua from 'universal-analytics';

import { Parser } from './parser';

const helpMd = fs.readFileSync(`${__dirname}/../help.md`, 'utf-8').toString();
const URL = 'https://frontendfront.com/recent/';
const bot = new Telegraf(process.env.BOT_TOKEN);

const getVisitor = (userId?: string) => ua(process.env.GA_TOKEN, userId, { strictCidFormat : false, https : true });

bot.use(async (ctx, next) => {
    const start = Date.now();
    const visitor = getVisitor();
    await next();
    const ms = Date.now() - start;
    console.log('Response time %sms', ms);
    visitor.timing('general', 'response', ms).send();
});

bot.command('help', ctx => ctx.replyWithMarkdown(helpMd));
bot.command('start', ctx => {
    const userId = ctx.update.message.from.id.toString();
    const visitor = getVisitor(userId);

    ctx.replyWithMarkdown(helpMd);
    visitor.event('usage', '/start action', 'registration').send();
});

bot.command('latest', async (ctx) => {
    const userId = ctx.update.message.from.id.toString();
    const visitor = getVisitor(userId);

    const reply = await Parser.parse(URL);
    ctx.reply(reply);
    visitor.event('usage', '/latest action').send();
});

bot.hears('hi', ctx => ctx.reply('Hey there!'));
bot.hears(/buy/i, ctx => ctx.reply('Buy-buy!'));
bot.on('sticker', ctx => ctx.reply('👍'));

export default bot;