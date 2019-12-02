import supertest from 'supertest';
import {
    app
} from './../index.js';
import should from 'should';

describe('Contacts API integration test', function () {
    this.timeout(120000);
    //it should return a collection of JSON documents
    it('should return collection of JSON docuemnts', (done) => {
        supertest(app).get('/api/contacts').expect('Content-type', /json/).expect(200).then(res => {
            res.should.have.property('status').equal(200);
            done();
        }).catch(err => {
            done(err);
        })
    })
});