const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const reports = input.trim().split('\n')
    .map((report) => {
        return report.split(/\s+/)
            .map(x => {
                const parsed = parseInt(x.trim());
                if (isNaN(parsed)) {
                    console.error('x is NaN', {x})
                }
                return parsed
            });
    });

// const validReports = reports.filter(report => {
//     return validateReport(report)
// });

([
    [[7,6,4,2,1], true],
    [[1,2,7,8,9], false],
    [[9,7,6,2,1], false],
    [[1,3,2,4,5], true],
    [[8,6,4,4,1], true],
    [[1,3,6,7,9], true],
]).forEach(([report, expected]) => {
    console.log({report, expected, result: validateReport(report)})
})

function validateReport(report) {
    console.log('\n\tValidating report: ' + report.join(','))
    if (isReportAscending(report)) {
        console.log('\tReport is ascending')
        return evaluateReport(report, (x,y) => y > x && (y - x) <= 3);
    } else {
        console.log('\tReport is descending')
        return evaluateReport(report, (x,y) => y < x && (x - y) <= 3)
    }
}


function isReportAscending(report) {
    // This does not cover the case where the report is neither ascending nor descending
    // However, this will be handled by the isReportSteadilyIncreasing and isReportSteadilyDecreasing functions
    return report[0] < report[1];
}
function evaluateReport(report, compareFn) {
    const firstInvalidLevel = report.findIndex((curr, i, arr) => {
        if (i === 0) {
            return false;
        }
        const prev = arr[i-1]
        return !compareFn(prev, curr)
    })
    if (firstInvalidLevel === -1) {
        console.log('\t\tAll levels are valid')
        return true
    }
    // In theory, firstInvalidLevel can never be 0.
    if (firstInvalidLevel === 0) {
        throw "WTF this shouldn't happen..."
    }
    console.log('\t\tAttempting with dampener')
    const reportWithoutFirstInvalid = report.filter((_, i) => i !== (firstInvalidLevel-1))
    return reportWithoutFirstInvalid.every((curr, i, arr) => {
        if (i === 0) {
            return true;
        }
        const prev = arr[i-1]
        return compareFn(prev, curr)
    })
}
