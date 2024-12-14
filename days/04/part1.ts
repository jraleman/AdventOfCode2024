import * as fs from 'node:fs';

function countXMAS(grid: string[][]): number {
    const word = "XMAS";
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    let count = 0;

    // Function to check a word in a specific direction
    function isWordAt(x: number, y: number, dx: number, dy: number): boolean {
        for (let i = 0; i < wordLength; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;

            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Directions to search: right, down, diagonals, and their reverses
    const directions = [
        [0, 1],   // Right
        [1, 0],   // Down
        [1, 1],   // Down-right diagonal
        [1, -1],  // Down-left diagonal
        [0, -1],  // Left (reversed)
        [-1, 0],  // Up (reversed)
        [-1, -1], // Up-left diagonal (reversed)
        [-1, 1],  // Up-right diagonal (reversed)
    ];

    // Search the grid
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            for (const [dx, dy] of directions) {
                if (isWordAt(x, y, dx, dy)) {
                    count++;
                }
            }
        }
    }

    return count;
}

function parseGrid(input: string): string[][] {
    return input.trim().split("\n").map(line => line.split(""));
}

function readMemoryFromFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8');
}

const filePath = './input';
const input = readMemoryFromFile(filePath);
const grid = parseGrid(input);
const occurrences = countXMAS(grid);

console.log(occurrences);
