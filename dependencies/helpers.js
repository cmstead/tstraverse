'use strict';

const signet = require('../signet-types');
const typescriptHelpers = require('./typescriptHelpers');

function matchesSyntaxKind(syntaxKind) {
    const isSelectedKind = signet.isTypeOf(`syntaxKind<${syntaxKind}>`);

    return value => isSelectedKind(typescriptHelpers.getSyntaxKind(value));
}

module.exports = {
    matchesSyntaxKind: signet.enforce(
        'existingSyntaxKind => (string => boolean)',
        matchesSyntaxKind
    )
};