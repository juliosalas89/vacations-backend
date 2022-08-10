import test from 'tape';
import request from 'supertest';
import { app, server } from '../../src';

test('---------------Endpoint: POST /vacation ------------------------------', assert => {
    const expectedCode = 201;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const newVacation = {
        place: 'jujuy',
        dateStart: '2022-08-16',
        dateEnd: '2022-08-21',
        rating: 8,
        allInclusive: 0,
        personsUuid: "a75471b4-16f3-11ed-85a2-bce92f8462cf"
    };

    request(app)
    .post('/vacation')
    .send(newVacation)
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
});

test('---------Endpoint: POST /Vacation (400 - Bad Request -)-------------', assert => {
    const expectedCode = 400;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const newVacation = {};
    
    request(app)
    .post('/vacation')
    .send(newVacation)
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})

test('-----Endpoint: POST /Vacation (500 - Server Error -)------------', assert => {
    const expectedCode = 422;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const newVacation = {
        place: 1,
        dateStart: '202-08-16',
        dateEnd: '2022-082-21',
        rating: 15,
        allInclusive: 2,
        personsUuid: "a75471b4-16f3-11ed-85a2-bce92f8462cf"
    };


    request(app)
    .post('/vacation')
    .send(newVacation)
    .expect(expectedCode)
    .then(res => {
        assert.pass(messageForExpectedCode);
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})