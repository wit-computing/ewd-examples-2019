import supertest from 'supertest';
import {
  app
} from '../index.js';
import should from 'should';
import asyncHandler from 'express-async-handler';

describe('Hacker News API test', function () {
  this.timeout(120000);
  let token = null;
  const badToken = 'Bearer 123abc';
  const testUser = {};

  before((done) => {
    testUser.username = 'user1';
    testUser.password = 'test1';
    // calling home page api
    supertest(app)
      .post('/api/users')
      .send(testUser)
      .expect(200)
      .then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal(true);
        token = res.body.token;
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should get a list of Posts', (done) => {

    supertest(app)
      .get('/api/posts')
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(200).then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should prevent access to posts without valid token', async()=> {

    const res = await supertest(app)
      .get('/api/posts')
      .set('Authorization', badToken)
      .expect(401).catch(err => {
        console.error(err);
        throw err;
      });
    res.should.have.property('status').equal(401);
  });



});