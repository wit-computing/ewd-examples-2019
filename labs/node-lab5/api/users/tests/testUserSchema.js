import should from 'should';
import userModel from '../userModel';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';

const sinonTest = sinonTestFactory(sinon);

describe('userModelTests', () => {
    const testUser = {};
    before(() => {
        const username = "fxwalsh";
        const password = "pass";
        testUser.username = username;
        testUser.password = password;

    });

    it('should validate a user with a username and password', (done) => {
        const m = new userModel(testUser);
        m.validate((err) => {
            should.not.exist(err);
            m.username.should.equal(testUser.username);
            m.password.should.equal(testUser.password);
            done();
        });
    });

    it('should require a username and password', (done) => {
        const user = {
            auser: "This is not valid"
        };
        const m = new userModel(user);
        m.validate((err) => {
            should.exist(err);
            const errors = err.errors;
            errors.should.have.property("username");
            errors.should.have.property("password");
            done();
        });
    });

    it('should search using username', sinonTest(function () {
        this.stub(userModel, 'findOne');
        userModel.findByUserName(testUser.username);
        sinon.assert.calledWith(userModel.findOne, {
            username: testUser.username
        });
    }));

    it('should detect matching passwords', sinonTest(function (done) {

        const username = "fxwalsh";
        const password = "$2a$10$hxklBTD1KLdYOCrulbtf8OKxjxFEc5WBCODCCCYGb67udslRc0mHi";

        const user1 = {
            username: username,
            password: password
        };

        const user2 = {
            username: username,
            password: password
        };

        const m1 = new userModel(user1);
        const m2 = new userModel(user2);

        m1.comparePassword(m2.password, (err, result) => {
                should.not.exist(err);
                result.should.be.true;
                done();
            }


        )
    }));

});