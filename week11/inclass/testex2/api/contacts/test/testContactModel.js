import should from 'should';
import contactModel from '../contactModel';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';

const sinonTest = sinonTestFactory(sinon);


describe('Contact Model Test', () => {

    let contacts = [];

    before(() => {
        console.log('kicking off tests...')
        contacts = [{
            name: 'Contact 1',
            address: '123 Test St',
            age: 12
        },
        {
            name: 'DodgyEmailContact',
            address: '23 Main St',
            age: 13,
            email: "fremydomain.com"
        },
        {
            name: 'EmailContact',
            address: '23 Main St',
            age: 13,
            email: "frem@ydomain.com"
        }]
    })

    it('should create a contact', (done) => {
        const contact = contacts[0];
        const m = new contactModel(contact);
        should.exist(m);
        m.should.have.property('name').with.valueOf(contact.name);
        m.age.should.be.a.Number();
        done();
    }
    )

    it('should require a valid email', (done) => {
        const contact = contacts[1];
        const m = new contactModel(contact);
        should.exist(m);
        m.validate((err) =>{
            should.exist(err);
            const errors = err.errors;
            errors.should.have.property('email');
            done();
        })  
    }
    )

    it('should validate email', (done) => {
        const contact = contacts[2];
        const m = new contactModel(contact);
        should.exist(m);
        m.validate((err) =>{
            should.not.exist(err);
            done();
        })  
    }
    )

    it('should compare email', (done) => {
        const contact = contacts[2]
        const m = new contactModel(contact);
        should.exist(m);
        m.compareEmail("frem@ydomain.com").should.not.be.a.Error();
        should(()=>{m.compareEmail("anne@mydomain.com");}).throw('Password mismatch');
        done();
    });

    it('should find contact by email', sinonTest( function () {
        this.stub(contactModel, 'findOne');
        const email = "frank@wit.com";
        contactModel.findByEmail(email);
        sinon.assert.calledWith(contactModel.findOne, {
            email: email
          });
    }));


})