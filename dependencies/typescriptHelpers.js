'use strict';

const typescript = require('typescript');

function getLowerCaseNodeKinds() {
    const numericPattern = /^\d+$/;
    return Object
        .keys(typescript.SyntaxKind)
        .filter(key => !numericPattern.test(key))
        .reduce((keyMap, key) => {
            const lowerCaseKey = key.toLowerCase();
            keyMap[lowerCaseKey] = typescript.SyntaxKind[key];
            return keyMap;
        }, {});
}

function createSourceFile(sourceFileName, sourceString) {
    return typescript.createSourceFile(
        sourceFileName,
        sourceString,
        typescript.ScriptTarget.ES2015,
        true,
        typescript.compilerOptions);
}

function getSyntaxKindByKindIndex(kindIndex) {
    return typescript.SyntaxKind[kindIndex];

}

function getSyntaxKind(value) {
    return getSyntaxKindByKindIndex(value.kind);
}

module.exports = {
    getSyntaxKindByKindIndex: getSyntaxKindByKindIndex,
    getLowerCaseNodeKinds: getLowerCaseNodeKinds,
    getSyntaxKind: getSyntaxKind,
    createSourceFile: createSourceFile
}