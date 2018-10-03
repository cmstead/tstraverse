# TSTraverse #

TSTraverse is a Typescript AST traversal tool for making static analysis tools easier to build. As time goes along, helper tooling will be added to limit the need for interacting directly with the typescript library for common tasks.

Find me online:
- [@cm_stead](https://twitter.com/cm_stead)
- [ChrisStead.com](http://www.chrisstead.com)

## Example ##

```javascript
// Test to verify enter and leave occur as a matched set

const sourceTree = typescript.createSourceFile(
            'Sample.ts',
            sourceCode,
            typescript.ScriptTarget.ES2015,
            true,
            typescript.compilerOptions);

let nodeStack = [];
let isMatching = true;

// Enter function will be executed as each node is first interacted with
function enter(node) {
    nodeStack.push(node);
}

// Leave function will be executed after all children have been interacted with
function leave(node) {
    const topNode = nodeStack.pop();
    
    isMatching = isMatching && topNode === node;
}

// Source tree can start from any known TS node 
tstraverse.traverse(sourceTree, {
    enter: enter,
    leave: leave
});

assert.isTrue(isMatching);
```

## Roadmap ##

- [ ] Source string AST generator for quick parsing
- [ ] Node type "kind" comparison function
- [ ] Quick node line and character start and end coordinate function
- [ ] Other utilities as they bubble up

## Version History ##

### v0.1.0 ###

- First traversal functionality added