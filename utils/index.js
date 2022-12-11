const fs = require('fs');
const readline = require('readline');

function getLineReader(filename) {
    const inputStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: inputStream,
        crlfDelay: Infinity
    });

    return rl;
}

module.exports = { getLineReader }