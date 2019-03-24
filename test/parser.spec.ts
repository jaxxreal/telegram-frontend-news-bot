import 'mocha';
import { expect } from 'chai';

import { Parser } from '../bot/parser';

describe('Parser', () => {
    const URL = 'https://frontendfront.com/recent/';

    it('should exist', () => {
        expect(Parser).to.exist;
    });

    it('#parse should fetch an article', async () => {
        const reply = await Parser.parse(URL);

        expect(reply).to.not.equal(Parser.ERROR_STRING);
    });

    it(`#parse shouldn't throw`, async () => {
        const URL = 'https://frontendfront.ru/recent/';
        try {
            const reply = await Parser.parse(URL);
        } catch (err) {
            expect(err.message).to.equal(Parser.ERROR_STRING);
        }
    });

    it('#getRandomArticle should return correct error string', async () => {
        const reply = Parser.getRandomArticle('blah');

        expect(reply).to.equal(Parser.ERROR_STRING);
    });
});
