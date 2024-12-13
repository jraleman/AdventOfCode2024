import * as fs from 'node:fs';

function isSafe(report: number[]): boolean {
    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        if (diff > 0) {
            decreasing = false;
        } else if (diff < 0) {
            increasing = false;
        }
    }
    return increasing || decreasing;
}

function readReportsFromFile(filePath: string): number[][] {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number));
}

function countSafeReports(reports: number[][]): number {
    let safeCount = 0;
    for (const report of reports) {
        if (isSafe(report)) {
            safeCount++;
        }
    }
    return safeCount;
}

const filePath = './input';
const reports = readReportsFromFile(filePath);
const safeReportsCount = countSafeReports(reports);

console.log(safeReportsCount);
