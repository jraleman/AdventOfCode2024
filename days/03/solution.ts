import * as fs from 'node:fs';

function findAndSumEnabledMulInstructions(corruptedMemory: string): number {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const controlRegex = /\b(do|don't)\(\)/g;
    let enabled = true;
    let totalSum = 0;

    let currentIndex = 0;
    while (currentIndex < corruptedMemory.length) {
        const nextMulMatch = mulRegex.exec(corruptedMemory);
        const nextControlMatch = controlRegex.exec(corruptedMemory);

        if (nextMulMatch && (!nextControlMatch || nextMulMatch.index < nextControlMatch.index)) {
            if (enabled) {
                const x = parseInt(nextMulMatch[1], 10);
                const y = parseInt(nextMulMatch[2], 10);
                totalSum += x * y;
            }
            currentIndex = nextMulMatch.index + nextMulMatch[0].length;
        } else if (nextControlMatch) {
            enabled = nextControlMatch[1] === 'do';
            currentIndex = nextControlMatch.index + nextControlMatch[0].length;
        } else {
            break;
        }
        mulRegex.lastIndex = currentIndex;
        controlRegex.lastIndex = currentIndex;
    }
    return totalSum;
}

function readMemoryFromFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
}

const filePath = './input';
const corruptedMemory = readMemoryFromFile(filePath);
const totalSum = findAndSumEnabledMulInstructions(corruptedMemory);

console.log(totalSum);
