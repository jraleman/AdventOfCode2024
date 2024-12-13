import * as fs from 'node:fs';

function findAndSumMulInstructions(corruptedMemory: string): number {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let match;
    let totalSum = 0;

    while ((match = regex.exec(corruptedMemory)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        totalSum += x * y;
    }
    return totalSum;
}

function readMemoryFromFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
}

const filePath = './input';
const corruptedMemory = readMemoryFromFile(filePath);
const totalSum = findAndSumMulInstructions(corruptedMemory);

console.log(totalSum);
