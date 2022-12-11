const { getLineReader } = require('../../utils');

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let total = 0;
    for await (const line of rl) {
        const first = line.substring(0, line.length/2);
        const second = line.substring(line.length / 2, line.length);
        // console.log(`${first} - ${second}`);
        // console.log(`${first.length} - ${second.length}`);
        let dupes = [];
        for (let i = 0; i < second.length; i++) {
            if (first.indexOf(second[i]) >= 0) {
                if (dupes.indexOf(second.charCodeAt(i)) < 0) {
                    // console.log(`${second[i]} - ${second.charCodeAt(i)}`);
                    dupes.push(second.charCodeAt(i));
                }
            }
        }

        for (let i = 0; i < dupes.length; i++) {
            // console.log(dupes[i] > 91 ? dupes[i] - 96 : dupes[i] - 64 + 26);
            total += dupes[i] > 91 ? dupes[i] - 96 : dupes[i] - 64 + 26;
        }
    }

    return total;
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let total = 0;
    let group = [];
    let dupes = [];
    let numGroups = 0;
    let n = 1;
    for await (const line of rl) {
        // console.log(`line ${n++} - ${group.length}`);        
        group.push(line);
        if (group.length === 3) {
            for (let i = 0; i < group[2].length; i++) {
                if (group[0].indexOf(group[2][i]) >= 0 && group[1].indexOf(group[2][i]) >= 0) {
                    if (dupes.indexOf(group[2].charCodeAt(i)) < 0) {
                        // console.log(`${group[2][i]} - ${group[2].charCodeAt(i)}`)
                        dupes.push(group[2].charCodeAt(i));
                    }
                }
            }

            for (let i = 0; i < dupes.length; i++) {
                // console.log(dupes[i] > 91 ? dupes[i] - 96 : dupes[i] - 64 + 26);
                total += dupes[i] > 91 ? dupes[i] - 96 : dupes[i] - 64 + 26;
            }

            dupes = [];
            group = [];
            numGroups++;
        }
    }
    // console.log(numGroups);
    return total;
}

module.exports = {firstProblem, secondProblem};