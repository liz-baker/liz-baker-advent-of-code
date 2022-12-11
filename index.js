async function showResultsForDay(day) {
    const dayString = String(day).padStart(2, '0');
    console.log(`Day ${dayString} results:`);
    const dayPackage = require(`./2022/${dayString}`);
    const firstResult = await dayPackage.firstProblem();
    const secondResult = await dayPackage.secondProblem();
    console.log(`First result: ${firstResult}`);
    console.log(`Second result: ${secondResult}`);
}

async function showResults() {
    for (let i = 1; i <=5; i++) {
        await showResultsForDay(i);
    }
}

showResults();