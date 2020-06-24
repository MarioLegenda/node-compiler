module.exports = function _resolveService(definition, deps) {
    return definition.init.call(null, ...deps);
};