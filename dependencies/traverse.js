'use strict';

const signet = require('../signet-types');
const utilities = require('./utilities');

const noOp = () => null;

function traverse(syntaxTreeNode, traverseActions) {
    const enter = utilities.either('function', noOp, traverseActions.enter);
    const leave = utilities.either('function', noOp, traverseActions.leave);

    function traverseNode(node) {
        enter(node);

        node.forEachChild(traverseNode);

        leave(node);
    }

    traverseNode(syntaxTreeNode);
}

module.exports = signet.enforce(
    'syntaxTreeNode, traverseActions => undefined',
    traverse);