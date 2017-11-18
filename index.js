'use strict';

const typescript = require('typescript');
const signet = require('./signet-types');

function either(type, defaultValue, userValue) {
    return signet.isTypeOf(type)(userValue)
        ? userValue
        : defaultValue
}

function noOp() { }

function onMatch(action, matchCheck) {
    return function (node) {
        const matchAction = matchCheck(node) ? action : noOp;
        matchAction(node);
    };
}

function onPropertyMatch(action, matchData) {
    const propertyKey = matchData.propertyKey;
    const matchAction = (node) => action(node[propertyKey])
    
    const matchFunction = signet.isTypeOf('function')(matchData.matchCriteria)
        ? matchData.matchCriteria
        : value => value === matchData.matchCriteria;

    return onMatch(matchAction, matchFunction)
}

function traverse(node, options) {
    const enter = either('function', noOp, options.enter);
    const leave = either('function', noOp, options.leave);

    function traverseNode(node) {
        enter(node);

        typescript.forEachChild(node, traverseNode);

        leave(node);
    }

    traverseNode(node);
}

module.exports = {
    traverse: signet.enforce(
        'syntaxTreeNode, traverseOptions => undefined',
        traverse),
    onMatch: signet.enforce(
        'action, matchCheck => syntaxTreeNode => undefined',
        onMatch),
    onPropertyMatch: signet.enforce(
        'action, propertyMatchData => syntaxTreeNode => undefined',
        onPropertyMatch)
}