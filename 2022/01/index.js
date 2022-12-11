const {getLineReader} = require('../../utils');

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let biggestSum = 0;
    let currentSum = 0;

    for await (const line of rl) {
        if (line.trim() === '') {
            if (currentSum > biggestSum) {
                biggestSum = currentSum;
            }

            currentSum = 0;
        } else {
            currentSum += Number(line.trim());
        }
    }

    return biggestSum;
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let currentSum = 0;
    let topSum = 0;
    let secondSum = 0;
    let thirdSum = 0;

    for await (const line of rl) {
        if (line.trim() === '') {
            if (currentSum > topSum) {
                thirdSum = secondSum;
                secondSum = topSum;
                topSum = currentSum;
            } else if (currentSum > secondSum) {
                thirdSum = secondSum;
                secondSum = currentSum;
            } else if (currentSum > thirdSum) {
                thirdSum = currentSum;
            }

            currentSum = 0;
        } else {
            currentSum += Number(line.trim());
        }
    }

    return topSum + secondSum + thirdSum;
}

module.exports = {firstProblem, secondProblem};