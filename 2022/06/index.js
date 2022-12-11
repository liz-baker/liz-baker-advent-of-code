const { getLineReader } = require('../../utils');

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let input = '';
    for await (const line of rl) {
        input = line;
    }

    let letterQueue = [];
    for (let i = 0; i < input.length; i++) {
        if (letterQueue.length < 4) {
            letterQueue.push(input[i]);
        } else {
            // console.dir(letterQueue);
            // console.dir(new Set(letterQueue));
            if ((new Set(letterQueue).size < 4)) {
                letterQueue.push(input[i]);
                letterQueue.shift();
            } else {
                return i;
            }
        }
    }

    return 'not implemented';
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let input = '';
    for await (const line of rl) {
        input = line;
    }

    let letterQueue = [];
    for (let i = 0; i < input.length; i++) {
        if (letterQueue.length < 14) {
            letterQueue.push(input[i]);
        } else {
            // console.dir(letterQueue);
            // console.dir(new Set(letterQueue));
            if ((new Set(letterQueue).size < 14)) {
                letterQueue.push(input[i]);
                letterQueue.shift();
            } else {
                return i;
            }
        }
    }

    return 'not implemented';
}

module.exports = {firstProblem, secondProblem};