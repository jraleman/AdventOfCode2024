import * as fs from 'node:fs';

function countXMASPatterns(grid: string[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const masVariants = ["MAS", "SAM"];
    let count = 0;

    // Helper to check if a string matches any MAS variant
    function isMASPattern(str: string): boolean {
        return masVariants.includes(str);
    }

    // Check for X-MAS pattern at the center of an X
    for (let x = 1; x < rows - 1; x++) {
        for (let y = 1; y < cols - 1; y++) {
            const topLeftToBottomRight = [
                grid[x - 1][y - 1],
                grid[x][y],
                grid[x + 1][y + 1],
            ].join("");
            const topRightToBottomLeft = [
                grid[x - 1][y + 1],
                grid[x][y],
                grid[x + 1][y - 1],
            ].join("");

            if (isMASPattern(topLeftToBottomRight) && isMASPattern(topRightToBottomLeft)) {
                count++;
            }
        }
    }

    return count;
}

// Function to read and parse the grid from a string
function parseGrid(input: string): string[][] {
    return input.trim().split("\n").map(line => line.split(""));
}

function readMemoryFromFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
}

const filePath = './input';
const input = readMemoryFromFile(filePath);
const grid = parseGrid(input);
const occurrences = countXMASPatterns(grid);

console.log("Total occurrences of X-MAS:", occurrences);
