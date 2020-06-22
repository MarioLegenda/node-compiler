const mocha = require('mocha');
const chai = require('chai');

const it = mocha.it;
const describe = mocha.describe;
const expect = chai.expect;

const Compiler = require('./../src/compiler');

describe('Compiler instance tests', () => {
    it('should run a test', () => {
        const c = Compiler.create();


    });
});
