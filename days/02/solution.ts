import * as fs from "node:fs";

function isSafeReport(report: number[]): boolean {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        if (diff > 0) {
            isDecreasing = false;
        } else if (diff < 0) {
            isIncreasing = false;
        }
    }
    return isIncreasing || isDecreasing;
}

function isSafeWithDampener(report: number[]): boolean {
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }
    return false;
}

function countSafeReports(filePath: string): number {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\n');
    let safeCount = 0;

    for (const line of lines) {
        const report = line.trim().split(/\s+/).map(Number);
        if (isSafeReport(report) || isSafeWithDampener(report)) {
            safeCount++;
        }
    }
    return safeCount;
}

const filePath = './input';
const safeReportsCount = countSafeReports(filePath);

console.log("Number of safe reports:", safeReportsCount);
