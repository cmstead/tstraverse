'use strict';

const typescript = require('typescript');
const signet = require('../signet-types');

function parse(sourceString, sourceFileName = 'source.ts') {
    const sourceFile = typescript.createSourceFile(
        sourceFileName,
        sourceString,
        typescript.ScriptTarget.ES2015,
        true,
        typescript.compilerOptions);

    return sourceFile;
}

module.exports = signet.enforce(
    'sourceString, [sourceFileName] => sourceFile',
    parse
);