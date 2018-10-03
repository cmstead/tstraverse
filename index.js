'use strict';

const signet = require('./signet-types');

function either(type, defaultValue, userValue) {
    return signet.isTypeOf(type)(userValue)
        ? userValue
        : defaultValue
}

const noOp = () => null;

function traverse(node, options) {
    const enter = either('function', noOp, options.enter);
    const leave = either('function', noOp, options.leave);

    function traverseNode(node) {
        enter(node);

        node.forEachChild(traverseNode);

        leave(node);
    }

    traverseNode(node);
}

module.exports = {
    traverse: signet.enforce(
        'syntaxTreeNode, traverseActions => undefined',
        traverse)
}