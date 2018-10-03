'use strict';

const typescript = require('typescript');
const signet = require('signet')();

const numericPattern = /^\d+$/;
const nodeKinds = Object
    .keys(typescript.SyntaxKind)
    .filter(key => !numericPattern.test(key))
    .map(key => key.toLowerCase());

signet.subtype('string')('syntaxKind', function(value) {
    return nodeKinds.includes(value.toLowerCase());
});

signet.alias('action', 'function<syntaxTreeNode => undefined>');

signet.defineDuckType('traverseActions', {
    enter: '?action',
    leave: '?action'
});

signet.defineDuckType('syntaxTreeNode', {
    pos: 'int',
    end: 'int'
});


module.exports = signet;