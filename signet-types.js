'use strict';

const signet = require('signet')();

require('./typeDefinitions/').forEach(action => action(signet));

module.exports = signet;