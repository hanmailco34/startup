const token         = require('../../server/token');
const httpMocks     = require('node-mocks-http');
const request       = require('supertest');
const infoData      = require('../data/token.data.json');
const app           = require('../../run');

let req, res, next;
beforeEach(() => {
    req     = httpMocks.createRequest();
    res     = httpMocks.createResponse();
    next    = jest.fn();
});

describe('token', () => {
    let setToken = '';
    test('토큰만들기', () => {
        setToken = token.setToken(infoData, res);
        expect(setToken).toMatch('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInNuc19pZCI6IjEwNzA0ODM2NzY5Mzg0NjcwODE2NSIsInNuc190eXBlIjoiZ29vZ2xlIiwibmFtZSI6IuydtOyImOu5iCIsImVtYWlsIjoiaGFubWFpbGNvMzRAZ21haWwuY29tIiwicG9pbnQiOjA');
    });

    test('미들웨어 토큰 정상값', () => {
        req.cookies.access_token = setToken;
        res.cookies.access_token = setToken;
        token.nextToken(req, res, next);
        expect(res.cookies.access_token).toBe(setToken);
    });

    test('미들웨어 토큰 비정상값', () => {
        req.cookies.access_token = setToken + '1';
        res.cookies.access_token = setToken;
        token.nextToken(req, res, next);
        var result = {
            "options": {
                "path": "/"
            }, 
            "value": ""
        }
        expect(res.cookies.access_token).toMatchObject(result);
    });

    test('토큰 체크하기', async () => {
        const response = await request(app).post('/token/check').set('Cookie',`access_token=${setToken}`);
        expect(response.body).toMatchObject({status:'OK'});
    });

    test('토큰 잘못된 값 가져오기', async () => {
        const response = await request(app).post('/token/check').set('Cookie',`access_token=${setToken}1`);
        expect(response.body).toMatchObject({status:'OOPS'});
    });

    test('토큰값 가져오기', () => {
        req.cookies.access_token = setToken;
        var verify = token.getToken(req);
        expect(verify.data).toMatchObject(infoData);
    });
});
