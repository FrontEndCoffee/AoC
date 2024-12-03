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
    })

const validReports = reports.filter(report => {
    if (isReportAscending(report)) {
        return isReportSteadilyIncreasing(report);
    } else {
        return isReportSteadilyDecreasing(report)
    }
})

console.log(validReports.length)

function isReportAscending(report) {
    // This does not cover the case where the report is neither ascending nor descending
    // However, this will be handled by the isReportSteadilyIncreasing and isReportSteadilyDecreasing functions
    return report[0] < report[1];
}
function isReportSteadilyIncreasing(report) {
    return report.every((curr, i, arr) => {
        if (i === 0) {
            return true;
        }
        const prev = arr[i-1]
        return curr > prev && curr - prev <= 3;
    })
}
function isReportSteadilyDecreasing(report) {
    return report.every((curr, i, arr) => {
        if (i === 0) {
            return true;
        }
        const prev = arr[i-1]
        return curr < prev && prev - curr <= 3;
    })
}