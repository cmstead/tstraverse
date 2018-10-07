'use strict';

const typescript = require('typescript');
const signet = require('../signet-types');

function matchesSyntaxKind(syntaxKind) {
    const isSelectedKind = signet.isTypeOf(`syntaxKind<${syntaxKind}>`);

    return value => isSelectedKind(typescript.SyntaxKind[value.kind]);
}

module.exports = {
    matchesSyntaxKind: signet.enforce(
        'existingSyntaxKind => (string => boolean)',
        matchesSyntaxKind
    )
};