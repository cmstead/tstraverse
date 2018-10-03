'use strict';

const fs = require('fs');

const typescript = require('typescript');
const sinon = require('sinon');
const { assert } = require('chai');

const tstraverse = require('../index');

describe('Traverse', function () {

    let sourceFile;

    beforeEach(function () {
        const sourceCode = fs.readFileSync('./tests/fixtures/Sample.ts', { encoding: 'utf8' });

        sourceFile = typescript.createSourceFile(
            'Sample.ts',
            sourceCode,
            typescript.ScriptTarget.ES2015,
            true,
            typescript.compilerOptions);
    });

    it('calls enter function on each node throughout traversal', function () {
        const enterSpy = sinon.spy();
        tstraverse.traverse(sourceFile, {
            enter: enterSpy
        });

        assert.equal(27, enterSpy.callCount);
    });

    it('calls leave function on each node throughout traversal', function () {
        const leaveSpy = sinon.spy();
        tstraverse.traverse(sourceFile, {
            leave: leaveSpy
        });

        assert.equal(27, leaveSpy.callCount);
    });

    it('calls enter and leave functions as a matched pair', function () {
        let nodeStack = [];
        let isMatching = true;

        function enter(node) {
            nodeStack.push(node);
        }

        function leave(node) {
            const topNode = nodeStack.pop();
            
            isMatching = isMatching && topNode === node;
        }

        tstraverse.traverse(sourceFile, {
            enter: enter,
            leave: leave
        });

        assert.isTrue(isMatching);
    });

});