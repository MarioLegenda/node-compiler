const getArgNames = require('./_getArgNames');

function factory() {

    this.name = null;

    const definitions = {};

    const resolved = {};

    function add(definition) {
    }

    function getOwnDefinition(name) {
    }

    function getDefinition(name) {
    }

    function getResolved(name) {
    }

    function hasOwn(name) {
    }

    function has(name) {
    }

    function isResolved(name) {
    }

    function compile(name) {
    }

    this.add = add;
    this.has = has;
    this.hasOwn = hasOwn;
    this.isResolved = isResolved;
    this.getOwnDefinition = getOwnDefinition;
    this.getDefinition = getDefinition;
    this.getResolved = getResolved;
    this.compile = compile;
}

function instance() {
    this.create = function() {
        return new factory();
    };
}

module.exports = new instance();