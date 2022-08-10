import test from 'tape';
import request from 'supertest';
import { app, server } from '../../src';


test('--------------- Endpoint: GET /vacation ------------', assert => {
    const expectedCode = 200;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const messageForExpectedResult = 'Response should be an array of objects or an empty array';

    request(app)
    .get('/vacation')
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
        const actualResult = Array.isArray(res.body._data.vacations);
        assert.deepEqual(actualResult, true, messageForExpectedResult);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})

test('--------- Endpoint: GET /vacation/:uuid ---------------', assert => {
    const expectedCode = 200;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const messageForExpectedResult = 'Response should be an array with one object';

    request(app)
    .get('/vacation/e96cdf43-16f3-11ed-85a2-bce92f8462cf')
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
        const actualResult = Array.isArray(res.body._data.vacations) && res.body._data.vacations.length === 1;
        assert.deepEqual(actualResult, true, messageForExpectedResult);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})

test('--------- Endpoint: GET /vacation?page=1&limit=2 ---------------', assert => {
    const expectedCode = 200;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const messageForExpectedResult = 'Response should be a two elements array and showld contain correct pagination information';

    request(app)
    .get('/vacation?page=1&limit=2')
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
        const actualResult = Array.isArray(res.body._data.vacations) && res.body._data.vacations.length === 2;
        const paginationResult = parseInt(res.body._page.limit) === 2 && parseInt(res.body._page.page) === 1;
        const completeResult = actualResult && paginationResult;
        
        assert.deepEqual(completeResult, true, messageForExpectedResult);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})