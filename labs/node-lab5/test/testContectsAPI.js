import supertest from 'supertest';
import {app} from '../index.js';
import should from 'should';

// UNIT test begin
describe('Contacts API test', function () {

  

    this.timeout(120000);
    // test #1: return a collection of json documents
    it('should return collection of JSON documents', function (done) {
        supertest(app)
            .get('/api/contacts')
            .expect('Content-type', /json/)
            .expect(200) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(200);
                done();
            }).close();
    });

    // test #2 add a contact
    it('should add a contact', function (done) {
        // post to /api/contacts
        supertest(app)
            .post('/api/contacts')
            .send({
                name: 'Contact 99',
                address: '123 Strand St',
                age:23
            })
            .expect('Content-type', /json/)
            .expect(201)
            .then ((res) => {
                res.status.should.equal(201);
                res.body.should.have.property('_id');
                res.body.name.should.equal('Contact 99');
                done();
            }).close();
    });


});