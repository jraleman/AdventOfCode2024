import * as fs from 'node:fs';

function calculateTotalDistance(leftList: number[], rightList: number[]): number {
    const sortedLeft = [...leftList].sort((a, b) => a - b);
    const sortedRight = [...rightList].sort((a, b) => a - b);
    let totalDistance = 0;

    for (let i = 0; i < sortedLeft.length; i++) {
        totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
    }
    return totalDistance;
}

function readListsFromFile(filePath: string): { leftList: number[]; rightList: number[] } {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\n');
    const leftList: number[] = [];
    const rightList: number[] = [];

    for (const line of lines) {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }

    return { leftList, rightList };
}

const filePath = './input';
const { leftList, rightList } = readListsFromFile(filePath);
const totalDistance = calculateTotalDistance(leftList, rightList);

console.log(totalDistance);
