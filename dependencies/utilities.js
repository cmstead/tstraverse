const signet = require('../signet-types');

function either(type, defaultValue, userValue) {
    return signet.isTypeOf(type)(userValue)
        ? userValue
        : defaultValue
}

module.exports = {
    either: either
}