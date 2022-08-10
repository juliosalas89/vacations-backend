import test from 'tape';
import request from 'supertest';
import { app, server } from '../../src';


test('--------------- Endpoint: PUT /vacation/:uuid ------------', assert => {
    const expectedCode = 204;
    const messageForExpectedCode = `Status code should be ${expectedCode}`;
    const expectedDeletedCode = 404;
    const messageForExpectedDeletedCode = 'Vacation not found on the database';
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
    .then(res => {
        const uuid = res.body._data.vacations[0].uuid
        return uuid;
    })
    .then(uuid => {
        return request(app)
        .delete(`/vacation/${uuid}`)
        .send()
        .expect(expectedCode)
        .then(()=> {
            assert.pass(messageForExpectedCode)
            return request(app)
            .get(`/vacation/${uuid}`)
            .expect(expectedDeletedCode)
            .then(()=> {
                assert.pass(messageForExpectedDeletedCode);
            })
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