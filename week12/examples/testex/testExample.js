import should from 'should';
import {
    add,
    mul
} from './calculator';

//A simple calculator
describe('Simple Calculator Tests', () => {
    // add should accept 2 numbers and return the their sum
    it('should calculate the sum of two numbers', (done) => {
        add(2, 2).should.equal(4);
        done();
    });

    // mul should accept 2 numbers and return their product
    it('should caculate the product of two numbers', (done) => {
        mul(2, 2).should.be.a.Number().and.be.exactly(4);
        done();
    });

})