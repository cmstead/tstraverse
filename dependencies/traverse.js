'use strict';

const signet = require('../signet-types');
const utilities = require('./utilities');

const noOp = () => null;

function traverse(node, options) {
    const enter = utilities.either('function', noOp, options.enter);
    const leave = utilities.either('function', noOp, options.leave);

    function traverseNode(node) {
        enter(node);

        node.forEachChild(traverseNode);

        leave(node);
    }

    traverseNode(node);
}

module.exports = signet.enforce(
    'syntaxTreeNode, traverseActions => undefined',
    traverse);