'use strict';

const signet = require('../signet-types');
const { getSyntaxKind } = require('./typescriptHelpers');

function matchesSyntaxKind(syntaxKind) {
    const isSelectedKind = signet.isTypeOf(`syntaxKind<${syntaxKind}>`);

    return value => isSelectedKind(getSyntaxKind(value));
}

module.exports = {
    matchesSyntaxKind: signet.enforce(
        'existingSyntaxKind => (string => boolean)',
        matchesSyntaxKind
    )
};