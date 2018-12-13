function source(signet) {

    signet.defineDuckType('syntaxTreeNode', {
        pos: 'int',
        end: 'int'
    });

    signet.defineDuckType('sourceFile', {
        text: 'string',
        statements: 'array<syntaxTreeNode>'
    });

    const sourceFileNamePattern = /^.*\.[a-z]{2,3}$/i
    signet.subtype('string')('sourceFileName', value => sourceFileNamePattern.test(value));

    signet.alias('sourceString', 'string');

    return signet;
}

module.exports = source;