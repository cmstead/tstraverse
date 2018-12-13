function actions(signet) {

    signet.alias('action', 'function<syntaxTreeNode => undefined>');

    signet.defineDuckType('traverseActions', {
        enter: '?action',
        leave: '?action'
    });

    return signet;
}

module.exports = actions;