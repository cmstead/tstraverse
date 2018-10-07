'use strict';

const typescript = require('typescript');
const signet = require('signet')();

const numericPattern = /^\d+$/;
const lowerCaseNodeKinds = Object
    .keys(typescript.SyntaxKind)
    .filter(key => !numericPattern.test(key))
    .reduce((keyMap, key) => {
        const lowerCaseKey = key.toLowerCase();
        keyMap[lowerCaseKey] = typescript.SyntaxKind[key];
        return keyMap;
    }, {});

const isDefined = signet.isTypeOf('not<undefined>');

signet.subtype('string')('existingSyntaxKind', value => isDefined(typescript.SyntaxKind[value]));
signet.subtype('string')('lowerCaseSyntaxKind', value => isDefined(lowerCaseNodeKinds[value]));

const syntaxKindPreprocessor = signet.enforce(
    'tuple<existingSyntaxKind> => lowerCaseSyntaxKind',
    function (options) {
        return options[0].toLowerCase();
    });

signet.subtype('string')(
    'syntaxKind{1}',
    function (value, selectedKind) {
        return selectedKind === value.toLowerCase();
    },
    syntaxKindPreprocessor
);

signet.alias('action', 'function<syntaxTreeNode => undefined>');

signet.defineDuckType('traverseActions', {
    enter: '?action',
    leave: '?action'
});

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

module.exports = signet;