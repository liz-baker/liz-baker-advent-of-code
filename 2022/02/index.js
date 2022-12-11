const { getLineReader } = require('../../utils');

const ROCK = 1, PAPER = 2, SCISSORS = 3;
const rpsMap = {
    'A': ROCK,
    'B': PAPER,
    'C': SCISSORS,
    'X': ROCK,
    'Y': PAPER,
    'Z': SCISSORS
};

function getRoundScore(result) {
    switch (result){
        case -1: return 0;
        case 0: return 3;
        case 1: return 6;
    }
}
/**
 * Returns 1 for win, 0 for tie, -1 for loss
 * @param {*} player 
 * @param {*} opponent 
 */
function checkRound(opponent, player) {
    switch (player) {
        case ROCK: {
            switch (opponent) {
                case ROCK:
                    return 0;
                case PAPER:
                    return -1;
                case SCISSORS:
                    return 1;
            }
        }
        case PAPER: {
            switch (opponent) {
                case ROCK:
                    return 1;
                case PAPER:
                    return 0;
                case SCISSORS:
                    return -1;
            }
        }
        case SCISSORS: {
            switch (opponent) {
                case ROCK:
                    return -1;
                case PAPER:
                    return 1;
                case SCISSORS:
                    return 0;
            }
        }
            
    }
}

async function firstProblem() {
    const rl = getLineReader(__dirname + '/input.txt');

    let total = 0;
    for await (const line of rl) {
        const round = line.trim().split(' ');
        // console.log();
        // console.log(getRoundScore(checkRound(rpsMap[round[0].trim()], rpsMap[round[1].trim()])));
        // console.log(rpsMap[round[1].trim()]);
        // console.log();
        total += getRoundScore(checkRound(rpsMap[round[0].trim()], rpsMap[round[1].trim()])) + rpsMap[round[1].trim()];
    }
    
    return total;
}

async function secondProblem() {
    const rl = getLineReader(__dirname + '/input.txt');
    // X = lose, Y = draw, Z = win
    const modTable = {
        'X': -1, 
        'Y': 0,
        'Z': +1
    };

    let total = 0;
    for await (const line of rl) {
        const round = line.trim().split(' ');
        let playerHand = rpsMap[round[0].trim()] + modTable[round[1].trim()];

        // I hate this but can't figure out the fancy mod math
        playerHand = playerHand === 0 ? SCISSORS : playerHand;
        playerHand = playerHand === 4 ? ROCK : playerHand;
        // console.log();
        // console.log(playerHand);
        // console.log(getRoundScore(checkRound(rpsMap[round[0].trim()], playerHand)));
        total += getRoundScore(checkRound(rpsMap[round[0].trim()], playerHand)) + playerHand;
    }

    return total;
}

module.exports = {firstProblem, secondProblem};