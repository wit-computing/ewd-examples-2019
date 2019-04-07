import should from 'should';
import {add, mul} from './calculator.js';

describe('Simple Calulator Test', () => {

    it('should sum two numbers',(done) =>{

        add(2,2).should.equal(4);
        done();

    })

    it('should sum two numbers',(done) =>{

        mul(2,1).should.equal(4);
        done();

    })

})