import request from 'supertest';
import app from '../app';
import {init} from '../db/repo';

beforeEach(async () => {
  await init();
});

describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Comments', () => {
    test('It should redirect when storing comments', async () => {
        const response = await request(app)
          .post('/')
          .send('comment=my comment');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/');
    });
    test('It should respond display the comments', async () => {
        await request(app)
          .post('/')
          .send('comment=TestComment');
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.stringContaining('TestComment'))
    });
    test('It should prevent XSS in the comments', async () => {
        await request(app)
          .post('/')
          .send('comment=<script>alert("boo!")</script>');
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(expect.not.stringContaining('<script>alert("boo!")</script>'))
    });
});
