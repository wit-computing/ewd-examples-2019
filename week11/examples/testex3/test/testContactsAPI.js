import supertest from 'supertest';
import {
    app
} from './../index.js';
import should from 'should';



describe('Contacts API integration test', function () {
    this.timeout(120000);
    //it should return a collection of JSON documents
    it('should return collection of JSON', (done) => {
        supertest(app).get('/api/contacts').expect('Content-type',/json/).expect(201).then(res=>{
            res.should.have.property('status').equal(200);
            done();
        }).catch(err=>{
            done(err);
        })
    })
});