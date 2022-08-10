import test from 'tape';
import request from 'supertest';
import { app, server } from '../../src';


test('--------------- Endpoint: PUT /vacation/:uuid ------------', assert => {
    const expectedCode = 201;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const messageForExpectedResult = "Response object key 'place' showl be equal to '123'"
    const newVacation = {
        place: 'jujuy',
        dateStart: '2022-08-16',
        dateEnd: '2022-08-21',
        rating: 8,
        allInclusive: 0,
        personsUuid: "a75471b4-16f3-11ed-85a2-bce92f8462cf"
    };

    const vacationUpdate = {
        place: '123'
    }

    request(app)
    .post('/vacation')
    .send(newVacation)
    .then(res => {
        const uuid = res.body._data.vacations[0].uuid
        return uuid;
    })
    .then(uuid => {
        return request(app)
        .put(`/vacation/${uuid}`)
        .send(vacationUpdate)
        .expect(expectedCode)
        .then(res => {
            assert.pass(messageForExpectedCode)
            const condition = res.body._data.vacations[0].place === '123'
            assert.deepEqual(condition, true, messageForExpectedResult)
        })
    })
    .catch(err => {
        assert.fail(err.message)
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})

test('--------------Endpoint: PUT /vacation/:uuid (404 - Not Found -)-------', assert => {
    const expectedCode = 404;
    const messageForExpectedCode =  `Status code should be ${expectedCode}`;

    request(app)
    .put('/vacations/anyId123456')
    .expect(expectedCode)
    .then(()=> {
        assert.pass(messageForExpectedCode)
    })
    .catch(err => {
        assert.fail(err.message);
    })
    .finally(()=> {
        server.close();
        assert.end();
    })
})