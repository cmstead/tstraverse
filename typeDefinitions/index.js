'use strict';

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname);
const typeFilePattern = /^(\.+)|(index\.js)$/;

function isTypeFile(value) {
    return !(typeFilePattern.test(value))
}

const typeFiles = files
    .filter(isTypeFile)
    .map(filename => require(path.join(__dirname, filename)));

module.exports = typeFiles;