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
        return isReportSteadilyIncreasing(report);
    } else {
        console.log('\tReport is descending')
        return isReportSteadilyDecreasing(report)
    }
}


function isReportAscending(report) {
    // This does not cover the case where the report is neither ascending nor descending
    // However, this will be handled by the isReportSteadilyIncreasing and isReportSteadilyDecreasing functions
    return report[0] < report[1];
}
function isReportSteadilyIncreasing(report) {
    let isDampenerAvailable = true;
    return report.every((curr, i, arr) => {
        console.log('\t\tEvaluating ', i)
        if (i < 2) {
            console.log('\t\t\tSkipping as it is one of the first two')
            return true;
        }
        // We will evaluate elements A,B,C
        const a = arr[i-2]
        const b = arr[i-1]
        const c = curr
        console.log('\t\t\tEvaluating ', a, b, c)

        const isValid = (x,y) => y > x && (y - x) <= 3
        if (isValid(a,b) && isValid(b,c)) {
            console.log('\t\t\t\tValid')
            return true
        }
        if (! isDampenerAvailable) {
            console.log('\t\t\t\tInvalid, no dampener available')
            return false
        }
        console.log('\t\t\t\tDampener available')

        if (isValid(a,c)) {
            console.log('\t\t\t\tIs valid, with dampener, using it.')
            isDampenerAvailable = false
            return true
        }
        console.log('\t\t\t\tInvalid, even with dampener')
        return false
    })
}
function isReportSteadilyDecreasing(report) {
    let isDampenerAvailable = true;
    return report.every((curr, i, arr) => {
        console.log('\t\tEvaluating ', i)
        if (i < 2) {
            console.log('\t\t\tSkipping as it is one of the first two')
            return true;
        }
        // We will evaluate elements A,B,C
        const a = arr[i-2]
        const b = arr[i-1]
        const c = curr
        console.log('\t\t\tEvaluating ', a, b, c)
        const isValid = (x,y) => y < x && (x - y) <= 3
        if (isValid(a,b) && isValid(b,c)) {
            console.log('\t\t\t\tValid')
            return true
        }
        if (! isDampenerAvailable) {
            console.log('\t\t\t\tInvalid, no dampener available')
            return false
        }
        console.log('\t\t\t\tDampener available')

        if (isValid(a,c)) {
            console.log('\t\t\t\tIs valid, with dampener, using it.')
            isDampenerAvailable = false
            return true
        }
        console.log('\t\t\t\tInvalid, even with dampener')
        return false
    })
}