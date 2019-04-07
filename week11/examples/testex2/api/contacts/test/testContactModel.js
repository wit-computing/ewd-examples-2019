import should from 'should';
import contactModel from '../contactModel';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';

const sinonTest = sinonTestFactory(sinon);



describe("Contact Model Test", () => {

    let contacts = [];

    before(() => {
        console.log('kicking off tests...')
        contacts = [{
                name: 'Contact 1',
                address: '123 Test St',
                age: 12
            },
            {
                name: 'Contact 2',
                age: 13
            },
            {
                name: 'Bad Contact',
                address: '23 Main St',
                age: 13,
                email: "N@t an Email"
            },
            {
                name: 'EmailContact',
                address: '23 Main St',
                age: 13,
                email: "freg@mydomain.com"
            }
        ];
    });

    after(() => {
        console.log("that's all folks");
    });


    it('should create a contact', (done) => {

        const contact = contacts[0];
        const m = new contactModel(contact);

        should.exist(m);
        m.should.have.property('name').with.valueOf(contact.name);
        m.age.should.be.a.Number();
        m.age.should.equal(contact.age);

        done();
    })

    it('should require a valid email', (done) => {
        const badcontact = contacts[2]
        const m = new contactModel(badcontact);
        should.exist(m);
        m.validate((err) => {
            should.exist(err);
            const errors = err.errors
            errors.should.have.property('email');
            done();
        })
    })

    it('should validate a contact with just name and age', (done) => {
        const goodcontact = contacts[1]
        const m = new contactModel(goodcontact);
        should.exist(m);
        m.validate((err) => {
            should.not.exist(err);
            m.name.should.equal(goodcontact.name);
            m.age.should.equal(goodcontact.age);
            done();
        })
    })

    it('should compare email', (done) => {
        const contact = contacts[3]
        const m = new contactModel(contact);
        should.exist(m);
        m.compareEmail("freg@mydomain.com").should.not.be.a.Error();
        should(()=>{m.compareEmail("anne@mydomain.com");}).throw('Password mismatch');
        done();
    });

it('should find contact by email', (done) => {
      const email = "frank@wit.com"
        const m = contactModel.findByEmail(email);
       should.exist(m);
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