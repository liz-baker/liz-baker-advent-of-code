const { getLineReader } = require('../../utils');

function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let total = 0;
    for await (const line of rl) {
        const ranges = line.split(',');
        const [min1, max1] = ranges[0].split('-').map(n => Number(n));
        const [min2, max2] = ranges[1].split('-').map(n => Number(n));

        if ((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)) {
            // console.log(`${line} - ${min1} - ${max1} - ${min2} - ${max2}`);
            total += 1;
        }
    }

    return total;
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let total = 0;
    for await (const line of rl) {
        const ranges = line.split(',');
        const [min1, max1] = ranges[0].split('-').map(n => Number(n));
        const [min2, max2] = ranges[1].split('-').map(n => Number(n));

        const range1 = range(min1, max1);
        const range2 = range(min2, max2);

        const intersection = range1.filter(x => range2.includes(x));

        // console.dir(intersection);
        if (intersection.length > 0) {
            total += 1;
        }
    }

    return total;
}

module.exports = {firstProblem, secondProblem};