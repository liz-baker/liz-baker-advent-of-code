const { getLineReader } = require('../../utils');

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let stateRead = false;
    let startingState = [];
    for await (const line of rl) {
        if (stateRead) {
            // process the movements
            const command = line.split(' ');
            const count = Number(command[1]);
            const src = Number(command[3]);
            const dest = Number(command[5]);
            for (let i = 0; i < count; i++) {
                startingState[dest-1].push(startingState[src-1].pop());
            }
        } else if (line.trim() === '') {
            stateRead = true;
        } else {
            if (line.indexOf('[') < 0) {
                continue;
            }

            const workline = line + ' '; // Add a trailing space to make math easy
            const crates = workline / 4; // '[A] '
            for (let i = 0; i < workline.length; i += 4) {
                if (startingState[i/4] === undefined) {
                    startingState[i/4] = [];
                }

                const label = workline.substring(i, i+4)[1];
                if (label != ' ') {
                    startingState[i/4].reverse();
                    startingState[i/4].push(workline.substring(i, i+4)[1]);
                    startingState[i/4].reverse();
                }
            }
            // startingState.push(line);
        }
    }

    // console.dir(startingState);
    let result = '';
    for (let i = 0; i < startingState.length; i++) {
        result += startingState[i].pop();
    }

    return result;
}

async function secondProblem() {
        const rl = getLineReader(__dirname + '/input.txt');

    let stateRead = false;
    let startingState = [];
    for await (const line of rl) {
        if (stateRead) {
            // process the movements
            const command = line.split(' ');
            const count = Number(command[1]);
            const src = Number(command[3]);
            const dest = Number(command[5]);
            // for (let i = 0; i < count; i++) {
            //     startingState[dest-1].push(startingState[src-1].pop());
            // }
            // console.log(`${src} - ${dest}`);
            // console.dir(startingState[src-1]);
            let cratesToMove = [];
            for (let i = 0; i < count; i++) {
                cratesToMove.push(startingState[src-1].pop());
            }
            // // console.dir(cratesToMove);
            // cratesToMove.reverse();
            for (let i = 0; i < count; i++) {
                startingState[dest-1].push(cratesToMove.pop());
            }
        } else if (line.trim() === '') {
            stateRead = true;
        } else {
            if (line.indexOf('[') < 0) {
                continue;
            }

            const workline = line + ' '; // Add a trailing space to make math easy
            const crates = workline / 4; // '[A] '
            for (let i = 0; i < workline.length; i += 4) {
                if (startingState[i/4] === undefined) {
                    startingState[i/4] = [];
                }

                const label = workline.substring(i, i+4)[1];
                if (label != ' ') {
                    startingState[i/4].reverse();
                    startingState[i/4].push(workline.substring(i, i+4)[1]);
                    startingState[i/4].reverse();
                }
            }

            // console.dir(startingState);
            // startingState.push(line);
        }
    }

    // console.dir(startingState);
    let result = '';
    for (let i = 0; i < startingState.length; i++) {
        result += startingState[i].pop();
    }
    
    return result;
}

module.exports = {firstProblem, secondProblem};