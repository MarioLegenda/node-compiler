const _getDependencies = require('./_getDependencies');
const _resolveService = require('./_resolveService');
const _getArgNames = require('./_getArgNames');

function factory() {

    this.name = null;

    const definitions = {};

    const resolved = {};

    function addDefinition(definition) {
        definitions[definition.name] = definition;
    }

    function getDefinition(name) {
        return definitions[name];
    }

    function hasDefinition(name) {
        return !!(definitions[name]);
    }

    function getResolved(name) {
        return resolved[name];
    }

    function isResolved(name) {
        return !!(resolved[name]);
    }

    function compile(name) {
        if (this.isResolved(name)) return this.getResolved(name);

        const definition = this.getDefinition(name);

        const args = _getArgNames(definition.init);

        const deps = _getDependencies.call(this, args);

        const service = _resolveService.call(this, definition, deps);

        resolved[name]  = service;

        return resolved[name];
    }

    function compileFn(fn, context) {
        const args = _getArgNames(fn);

        const deps = _getDependencies.call(this, args);

        if (context) {
            return fn.bind(context, ...deps);
        }

        return fn.bind(null, ...deps);
    }

    this.addDefinition = addDefinition;
    this.hasDefinition = hasDefinition;
    this.isResolved = isResolved;
    this.getDefinition = getDefinition;
    this.getResolved = getResolved;
    this.compile = compile;
    this.compileFn = compileFn;
}

function instance() {
    this.create = function() {
        return new factory();
    };
}

module.exports = new instance();