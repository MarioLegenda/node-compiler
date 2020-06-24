const mocha = require('mocha');
const chai = require('chai');

const it = mocha.it;
const describe = mocha.describe;
const expect = chai.expect;

const Compiler = require('./../src/compiler');

describe('Compiler instance tests', () => {
    it('should check the public API', () => {
        const c = Compiler.create();

        const def1 = {
            name: 'def1',
            init() {
                return function() {
                    return 'def1';
                }
            }
        }

        c.addDefinition(def1);

        expect(c.hasDefinition('def1')).to.be.equal(true);
        expect(c.getDefinition('def1')).to.be.a('object');

        expect(c.hasDefinition('not-exists')).to.be.equal(false);
        expect(c.getDefinition('not-exists')).to.be.equal(undefined);
        expect(c.getResolved('not-exists')).to.be.equal(undefined);
        expect(c.isResolved('not-exists')).to.be.equal(false);

        c.compile('def1');


    });

    it('should compile a dependency', () => {
        const c = Compiler.create();

        const def1 = {
            name: 'def1',
            init() {
                return function() {
                    return 'def1';
                }
            }
        }

        const def2 = {
            name: 'def2',
            init() {
                return function() {
                    return 'def2';
                }
            }
        }

        const completeDef = {
            name: 'completeDef',
            init(def1, def2) {
                return function() {
                    return [def1(), def2()]

                }
            }
        }

        c.addDefinition(def1);
        c.addDefinition(def2);
        c.addDefinition(completeDef);

        const service = c.compile('completeDef');

        const defs = service.call();

        expect(defs[0]).to.be.equal('def1');
        expect(defs[1]).to.be.equal('def2');
    });

    it('should compileFn outside of the compiler', () => {
        const userRepositoryDefinition = {
            name: 'UserRepository',
            init() {
                function UserRepository() {
                    this.name = 'UserRepository';
                }

                return new UserRepository();
            }
        }

        const userServiceDefinition = {
            name: 'UserService',
            init(UserRepository) {
                function UserService(userRepository) {
                    this.name = 'UserService';

                    this.userRepository = userRepository;
                }

                return new UserService(UserRepository);
            }
        }

        const c = Compiler.create();

        c.addDefinition(userRepositoryDefinition);
        c.addDefinition(userServiceDefinition);

        const fn = function(UserService) {
            return UserService.name;
        }

        const compiledFn = c.compileFn(fn);

        expect(compiledFn()).to.be.equal('UserService');

        const anotherFn = function(UserRepository) {
            return UserRepository.name;
        }

        const anotherCompiled = c.compileFn(anotherFn);

        expect(anotherCompiled()).to.be.equal('UserRepository');
    });
});
