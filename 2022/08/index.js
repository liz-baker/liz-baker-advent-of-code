const { getLineReader } = require('../../utils');

const NORTH_SOUTH = 0, EAST_WEST = 1;

function calculateVisibleForest(forest) {
    for (let i = 0; i < forest.length; i++) {
        calculateVisible(forest[i]);
    }

    for (let i = 0; i < forest[0].length; i++) {
        calculateVisible(forest.map(t => t[i]));
    }
}

function calculateVisible(treeline) {
    let maxHeight = -1;
    for (let i = 0; i < treeline.length; i++) {
        if (treeline[i].height > maxHeight) {
            treeline[i].visible = true;
            maxHeight = treeline[i].height;
        }
    }

    maxHeight = -1;
    for (let i = treeline.length - 1; i >= 0; i--) {
        if (treeline[i].height > maxHeight) {
            treeline[i].visible = true;
            maxHeight = treeline[i].height;
        }
    }

    // console.dir(treeline);
}

function calculateViewingSouthEast(treeline, direction) {
    let visible = 0;
        let tallest = -1;
        for (let i = 1; i < treeline.length; i++) {
            if ((treeline[i].height >= tallest && treeline[i].height < treeline[0].height)
                || treeline[i].height > tallest) {
                visible += 1
                tallest = treeline[i].height;
            }
        }

    switch (direction) {
        case NORTH_SOUTH:
            treeline[0].southVisible = visible;
            break;
        case EAST_WEST:
            treeline[0].eastVisible = visible;
    }
    if (treeline.length > 1) {
        calculateViewingSouthEast(treeline.slice(1), direction);
    }
}

function calculateViewingNorthWest(treeline, direction) {
    // console.dir(treeline);
    let visible = 0;
    // if (treeline.length === 1) {
    //     return;
    // } else if (treeline.length === 2) {
    //     visible = 1;
    // } else {
        let tallest = -1;
        for (let i = treeline.length - 2; i >= 0; i--) {
            if ((treeline[i].height >= tallest && treeline[i].height < treeline[treeline.length - 1].height)
            || treeline[i].height > tallest) {
                visible += 1
                tallest = treeline[i].height;
            }
        }
    // }

    switch (direction) {
        case NORTH_SOUTH:
            treeline[treeline.length - 1].northVisible = visible;
            break;
        case EAST_WEST:
            treeline[treeline.length - 1].westVisible = visible;
    }

    if (treeline.length > 1) {
        calculateViewingNorthWest(treeline.slice(0, treeline.length - 1), direction);
    }
}

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');
    const forest = [];

    for await (const line of rl) {
        forest.push(Array.from(line).map(t => {
            return {
                height: Number(t),
                visible: false
            };
        }));
    }

    calculateVisibleForest(forest);
    // console.dir(forest);
    const total = forest.flat().filter(t => t.visible).length;

    return total;
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');
    const forest = [];

    for await (const line of rl) {
        forest.push(Array.from(line).map(t => {
            return {
                height: Number(t),
                northVisible: 0,
                southVisible: 0,
                eastVisible: 0,
                westVisible: 0
            };
        }));
    }

    for (let i = 0; i < forest.length; i++) {
        calculateViewingSouthEast(forest[i], EAST_WEST);
        calculateViewingNorthWest(forest[i], EAST_WEST);
    }

    for (let i = 0; i < forest[0].length; i++) {
        calculateViewingSouthEast(forest.map(t => t[i]), NORTH_SOUTH);
        calculateViewingNorthWest(forest.map(t => t[i]), NORTH_SOUTH);
    }

    // console.dir(forest);

    const result = forest.flat().map(t => t.northVisible * t.southVisible * t.westVisible * t.eastVisible).sort().pop()

    return result;
}

module.exports = {firstProblem, secondProblem};