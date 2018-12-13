'use strict';

const typescript = require('typescript');

function createSourceFile(sourceFileName, sourceString) {
    return typescript.createSourceFile(
        sourceFileName,
        sourceString,
        typescript.ScriptTarget.ES2015,
        true,
        typescript.compilerOptions);
}

function getSyntaxKind(value) {
    return typescript.SyntaxKind[value.kind];
}

module.exports = {
    getSyntaxKind: getSyntaxKind,
    createSourceFile: createSourceFile
}