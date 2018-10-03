'use strict';

const signet = require('signet')();

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