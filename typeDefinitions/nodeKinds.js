const { getSyntaxKindByKindIndex, getLowerCaseNodeKinds } = require('../dependencies/typescriptHelpers');

function nodeKinds(signet) {
    'use strict';

    const lowerCaseNodeKinds = getLowerCaseNodeKinds();

    const isDefined = signet.isTypeOf('not<undefined>');

    signet.subtype('string')('existingSyntaxKind', value => isDefined(getSyntaxKindByKindIndex(value)));
    signet.subtype('string')('lowerCaseSyntaxKind', value => isDefined(lowerCaseNodeKinds[value]));

    const syntaxKindPreprocessor = signet.enforce(
        'tuple<existingSyntaxKind> => lowerCaseSyntaxKind',
        function (options) {
            return options[0].toLowerCase();
        });

    signet.subtype('string')(
        'syntaxKind{1}',
        function (value, selectedKind) {
            return selectedKind === value.toLowerCase();
        },
        syntaxKindPreprocessor
    );

    return signet;
}

module.exports = nodeKinds;