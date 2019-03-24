import * as cheerio from 'cheerio';
import * as request from 'request';
const _random = require('lodash.random');

export class Parser {
    static ERROR_STRING = `Ooops! I can't help you right now 😕`;
    static lastParseCallMs = 0;
    static timeout = 60000;
    static get isCacheExpired() {
        return (Parser.lastParseCallMs + Parser.timeout) < Date.now();
    }
    static htmlCache = '';
    static parse(URL: string) {
        if (!Parser.isCacheExpired) {
            return Parser.getRandomArticle(Parser.htmlCache);
        }
        return new Promise<string>((resolve, reject) => {
            request(URL, (error: any, response: any, html: any) => {
                if (error) {
                    return reject(Parser.ERROR_STRING);
                }

                Parser.htmlCache = html;
                Parser.lastParseCallMs = Date.now();

                const reply = Parser.getRandomArticle(html);

                resolve(reply);
            });
        });
    }
    static getRandomArticle(html: string) {
        const $ = cheerio.load(html);
        const links = $(`.stories-list .story-link`);

        const randomIdx = _random(0, links.length);
        const link = $(links.get(randomIdx));

        if (!link.text() || !link.attr('href')) {
            return Parser.ERROR_STRING;
        }

        const reply = `Hey! A new story is here:\n\n${link.text()} ${link.attr('href')}`;

        return reply;
    }
}