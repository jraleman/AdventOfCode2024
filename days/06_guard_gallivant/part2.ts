import * as fs from "node:fs";

type Position = { x: number; y: number };
type Direction = "up" | "right" | "down" | "left";


const readMapFromFile = (filePath: string): string[] => {
  try {
    return fs.readFileSync(filePath, "utf-8").trim().split("\n");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1); // Exit with an error code
  }
};


const parseMap = (map: string[]): { grid: string[][]; guard: Position; direction: Direction } => {
  let guard: Position = { x: 0, y: 0 };
  let direction: Direction = "up";

  const grid = map.map((row, y) => row.split("").map((cell, x) => {
    if ("^v<>".includes(cell)) {
      guard = { x, y };
      direction = cell === "^" ? "up" : cell === "v" ? "down" : cell === "<" ? "left" : "right";
      return "."; // Replace the guard's starting position with empty space for simulation
    }
    return cell;
  }));

  return { grid, guard, direction };
};


const move = (position: Position, direction: Direction): Position => {
  const moves: Record<Direction, Position> = {
    up: { x: position.x, y: position.y - 1 },
    right: { x: position.x + 1, y: position.y },
    down: { x: position.x, y: position.y + 1 },
    left: { x: position.x - 1, y: position.y },
  };
  return moves[direction];
};


const turnRight = (direction: Direction): Direction => {
  const directions: Direction[] = ["up", "right", "down", "left"];
  const newIndex = (directions.indexOf(direction) + 1) % directions.length;
  return directions[newIndex];
};

const doesGuardGetStuck = (grid: string[][], guard: Position, direction: Direction): boolean => {
  let currentPosition = guard;
  let currentDirection = direction;
  const visited = new Set<string>();

  while (true) {
    const key = `${currentPosition.x},${currentPosition.y},${currentDirection}`;
    if (visited.has(key)) return true; // The guard re-enters a position with the same direction, indicating a loop
    visited.add(key);

    const nextPosition = move(currentPosition, currentDirection);

    // Check if the next position is out of bounds
    if (
      nextPosition.y < 0 ||
      nextPosition.y >= grid.length ||
      nextPosition.x < 0 ||
      nextPosition.x >= grid[0].length
    ) {
      return false; // Guard leaves the map
    }

    // Check if the next position is an obstacle
    if (grid[nextPosition.y][nextPosition.x] === "#") {
      currentDirection = turnRight(currentDirection); // Turn right
    } else {
      // Move forward
      currentPosition = nextPosition;
    }
  }
};


const countValidObstructionPositions = (map: string[]): number => {
  const { grid, guard, direction } = parseMap(map);
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      // Skip positions that are already obstacles or the guard's starting position
      if (grid[y][x] === "#" || (x === guard.x && y === guard.y)) continue;

      // Temporarily place an obstruction and test if it causes a loop
      grid[y][x] = "#";
      if (doesGuardGetStuck(grid, guard, direction)) {
        count++;
      }
      grid[y][x] = "."; // Restore the original state
    }
  }

  return count;
};

const filePath = "input";
const map = readMapFromFile(filePath);

const result = countValidObstructionPositions(map);
console.log(result);
