import { readInputFromFile } from "../utils.ts";

type Position = { x: number; y: number };
type Direction = "up" | "right" | "down" | "left";

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

const simulatePatrol = (map: string[]): number => {
  const { grid, guard, direction } = parseMap(map);
  let currentPosition = guard;
  let currentDirection = direction;

  const visited = new Set<string>();
  visited.add(`${currentPosition.x},${currentPosition.y}`);

  while (true) {
    const nextPosition = move(currentPosition, currentDirection);

    // Check if the next position is out of bounds
    if (
      nextPosition.y < 0 ||
      nextPosition.y >= grid.length ||
      nextPosition.x < 0 ||
      nextPosition.x >= grid[0].length
    ) {
      break; // Guard has left the map
    }

    // Check if the next position is an obstacle
    if (grid[nextPosition.y][nextPosition.x] === "#") {
      currentDirection = turnRight(currentDirection); // Turn right
    } else {
      // Move forward
      currentPosition = nextPosition;
      visited.add(`${currentPosition.x},${currentPosition.y}`);
    }
  }

  return visited.size;
};

const map = readInputFromFile("input")
.split("\n");

// Simulate the patrol and output the result
const result = simulatePatrol(map);



// Simulate the patrol and output the result
// const result = simulatePatrol(map);
console.log(result);
