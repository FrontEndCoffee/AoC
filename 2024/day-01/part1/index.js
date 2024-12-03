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

listA.sort()
listB.sort()

const pairs = listA.map((x, i) => [x, listB[i]]);

const distancesPerPair = pairs.map(([x, y]) => Math.abs(x - y));

// console.log(listA.length, listB.length)
console.log(distancesPerPair.reduce((acc, x) => acc + x, 0));