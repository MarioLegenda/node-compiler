module.exports = function _getDependencies(args) {
    const deps = [];
    if (args.length > 0) {
        for (const arg of args) {
            deps.push(this.compile(arg));
        }
    }

    return deps;
}