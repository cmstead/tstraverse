'use strict';

const typescript = require('typescript');
const fs = require('fs');

const { assert } = require('chai');

const tstraverse = require('../index');

describe('matchesSyntaxKind', function () {

    let sourceFile;

    beforeEach(function () {
        const sourceCode = fs.readFileSync('./tests/fixtures/Sample.ts', { encoding: 'utf8' });
        const fileName = 'Sample.ts';

        sourceFile = tstraverse.helpers.parse(sourceCode, fileName);
    });

    it('returns true when ast node kind matches expected kind', function () {
        const firstMember = sourceFile.statements[0].members[0];
        const syntaxKind = typescript.SyntaxKind[firstMember.kind];

        const nodeKindMatches = tstraverse.helpers.matchesSyntaxKind(syntaxKind)(firstMember);

        assert.isTrue(nodeKindMatches);
    });

    it('returns false when ast node kind does not match expected kind', function () {
        const firstMember = sourceFile.statements[0].members[0];
        const secondMember = sourceFile.statements[0].members[1];
        const syntaxKind = typescript.SyntaxKind[firstMember.kind];

        const nodeKindMatches = tstraverse.helpers.matchesSyntaxKind(syntaxKind)(secondMember);

        assert.isFalse(nodeKindMatches);
    });

    it('throws error when provided syntax kind does not exist', function () {
        const syntaxKind = 'foo';
        const syntaxKindCheck = () => tstraverse.helpers.matchesSyntaxKind(syntaxKind);

        assert.throws(syntaxKindCheck);
    });

});