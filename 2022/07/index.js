const { Console } = require('console');
const { getLineReader } = require('../../utils');

const DIRECTORY = 0, FILE = 1;

function printDirectory(dir, depth = 0) {
    let dirString = '';
    for (let i = 0; i < depth; i ++) {
        dirString += '| ';
    }

    dirString += dir.label + '\t' + dir.computedSize;
    console.log(dirString);

    if (dir.children) {
        for (const child of dir.children) {
            printDirectory(child, depth + 1);
        }
    }
}

function computeSize(dir) {
    if (dir.type === FILE) {
        return dir.size;
    }

    for (const child of dir.children) {
        child.computedSize = computeSize(child);
    }

    return dir.children.reduce((acc, cur) => acc + cur.computedSize, 0);
}

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    const rootDir = {
        label: '/',
        type: DIRECTORY,
        children: [],
        size: 0,
        computedSize: -1,
        parent: undefined
    };

    let currentDir = rootDir;
    let isListing = false;
   
    for await (const line of rl) {
        const tokens = line.split(' ');
        if (tokens[0] === '$') {
            switch(tokens[1].toLowerCase()) {
                case 'cd':
                    switch (tokens[2]) {
                        case '/':
                            currentDir = rootDir;
                            break;
                        case '..':
                            currentDir = currentDir.parent;
                            break;
                        default:
                            currentDir = currentDir.children.find(d => d.type === DIRECTORY && d.label === tokens[2]);
                            break;
                    }
                    break;
                case 'ls':
                    break;
                default:
                    console.log(`-------- UNDEFINED COMMAND ${tokens[1]}--------`)
            }
        } else {
            if (tokens[0] === 'dir') {
                currentDir.children.push({
                    label: tokens[1],
                    type: DIRECTORY,
                    children: [],
                    size: 0,
                    computedSize: -1,
                    parent: currentDir
                });
            } else {
                currentDir.children.push({
                    label: tokens[1],
                    type: FILE,
                    children: undefined,
                    size: Number(tokens[0]),
                    computedSize: Number(tokens[0]),
                    parent: currentDir
                });
            }
        }
    }

    rootDir.computedSize = computeSize(rootDir);

    // printDirectory(rootDir);

    const findDirs = (dir) => {
        let result = [];
        if (dir.computedSize <= 100000) {
            result = result.concat(dir);
        }


        for (const subDir of dir.children.filter(d => d.type === DIRECTORY)) {
            result = result.concat(findDirs(subDir));
        }

        // console.dir(result);
        return result;
    }

    const foundDirs = findDirs(rootDir);
    // console.log(foundDirs);

    return foundDirs.reduce((acc, cur) => acc += cur.computedSize, 0);
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    const rootDir = {
        label: '/',
        type: DIRECTORY,
        children: [],
        size: 0,
        computedSize: -1,
        parent: undefined
    };

    let currentDir = rootDir;
    let isListing = false;
   
    for await (const line of rl) {
        const tokens = line.split(' ');
        if (tokens[0] === '$') {
            switch(tokens[1].toLowerCase()) {
                case 'cd':
                    switch (tokens[2]) {
                        case '/':
                            currentDir = rootDir;
                            break;
                        case '..':
                            currentDir = currentDir.parent;
                            break;
                        default:
                            currentDir = currentDir.children.find(d => d.type === DIRECTORY && d.label === tokens[2]);
                            break;
                    }
                    break;
                case 'ls':
                    break;
                default:
                    console.log(`-------- UNDEFINED COMMAND ${tokens[1]}--------`)
            }
        } else {
            if (tokens[0] === 'dir') {
                currentDir.children.push({
                    label: tokens[1],
                    type: DIRECTORY,
                    children: [],
                    size: 0,
                    computedSize: -1,
                    parent: currentDir
                });
            } else {
                currentDir.children.push({
                    label: tokens[1],
                    type: FILE,
                    children: undefined,
                    size: Number(tokens[0]),
                    computedSize: Number(tokens[0]),
                    parent: currentDir
                });
            }
        }
    }

    rootDir.computedSize = computeSize(rootDir);

    const freeSpace = 70000000 - rootDir.computedSize;
    // console.log(`Free Space ${freeSpace}`);
    // minimum space needed is 30000000
    const spaceNeeded = 30000000 - freeSpace;
    // console.log(`Space Needed: ${spaceNeeded}`);

    // printDirectory(rootDir);

    const findDirs = (dir) => {
        // console.log(`Space Needed: ${spaceNeeded}`);
        let result = [];
        if (dir.computedSize >= spaceNeeded) {
            result = result.concat(dir);
        }


        for (const subDir of dir.children.filter(d => d.type === DIRECTORY)) {
            result = result.concat(findDirs(subDir));
        }

        // console.dir(result);
        return result;
    }

    const foundDirs = findDirs(rootDir);
    const dirToRemove = foundDirs.sort((a, b) => a.computedSize - b.computedSize)[0];
    // console.dir(dirToRemove);
    // console.log(foundDirs);

    return dirToRemove.computedSize;
}

module.exports = {firstProblem, secondProblem};