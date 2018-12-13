'use strict';

const signet = require('../signet-types');
const { createSourceFile } = require('./typescriptHelpers');

function parse(sourceString, sourceFileName = 'source.ts') {
    const sourceFile = createSourceFile(sourceFileName, sourceString);

    return sourceFile;
}

module.exports = signet.enforce(
    'sourceString, [sourceFileName] => sourceFile',
    parse
);