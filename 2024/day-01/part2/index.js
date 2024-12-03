// Open input.txt and read the contents
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
let listA = []
let listB = []
input.trim().split('\n')
    .map((pair, i) => {
            const parsedPair = pair
                .split(/\s+/, 2)
                .map(x => parseInt(x.trim()));
            console.debug({i, pair, parsedPair})
            return parsedPair;
        }
    )
    .forEach(([x, y], i) => {
        listA.push(x)
        listB.push(y)
        if (isNaN(x)) {
            console.error('x is NaN', {x,i})
        }
        if (isNaN(y)) {
            console.error('y is NaN', {y,i})
        }
    });

const listASimalarityScores = listA.map((x) => {
    const occurences = listB.filter(y => y === x).length;
    return occurences * x;
})

const totalSimilarityScore = listASimalarityScores.reduce((acc, x) => acc + x, 0);
console.log({totalSimilarityScore});