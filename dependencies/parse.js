'use strict';

const signet = require('../signet-types');
const typescriptHelpers = require('./typescriptHelpers');

function parse(sourceString, sourceFileName = 'source.ts') {
    const sourceFile = typescriptHelpers.createSourceFile(sourceFileName, sourceString);

    return sourceFile;
}

module.exports = signet.enforce(
    'sourceString, [sourceFileName] => sourceFile',
    parse
);