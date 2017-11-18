'use strict';

const signet = require('signet')();

signet.defineDuckType('traverseOptions', {
    enter: '?function',
    leave: '?function'
});

signet.defineDuckType('syntaxTreeNode', {
    pos: 'int',
    end: 'int',
    flags: 'int'
});

signet.alias('action', 'function<syntaxTreeNode => *>');
signet.alias('matchCheck', 'function<syntaxTreeNode => boolean>');
signet.alias('propertyKey', 'variant<string, number, symbol>');
signet.alias('propertyMatchCriteria', 'variant<*>');

signet.defineDuckType('propertyMatchData', {
    propertyKey: 'propertyKey',
    matchCriteria: 'propertyMatchCriteria'
});


module.exports = signet;