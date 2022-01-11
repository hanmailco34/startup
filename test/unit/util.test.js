const util = require('../../server/util');

describe('util', () => {
    test('httpCall 테스트', async () => {
        const option = {
            url : 'https://www.naver.com'
        }
        const result = await util.httpCall(option);
        expect(result.status).toBe('OK');
    });

    test('httpCall option이 객체형태가 아닐때', async () => {
        const option = 'https://www.naver.com';
        try {
            await util.httpCall(option);
        } catch(e) {
            expect(e.data).toEqual('please object');
        }        
    });

    test('httpCall url이 없을때', async () => {
        const option = {
            url2 : 'https://www.naver.com'
        }
        try {
            await util.httpCall(option);
        } catch(e) {
            expect(e.data).toEqual('please url');
        }        
    });
});