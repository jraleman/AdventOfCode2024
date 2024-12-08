import * as fs from "node:fs";

type Equation = {
  target: number;
  numbers: number[];
};

// TODO: MOVE TO UTILS FOR REUSABILITY
/**
 * Reads input from a text file.
 * @param filePath - Path to the input text file.
 * @returns The content of the file as a string.
 */
const readInputFromFile = (filePath: string): string | undefined => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

/**
 * Parses input into structured equations.
 * @param input - Multiline string with equations.
 * @returns Array of equations.
 */
const parseInput = (input: string): Equation[] => {
  return input.split("\n").map((line) => {
    const [target, numbers] = line.split(":");
    return {
      target: parseInt(target.trim()),
      numbers: numbers.trim().split(" ").map(Number),
    };
  });
};

/**
 * Recursively evaluates all possible combinations of + and * operators.
 * @param numbers - Array of numbers to combine.
 * @param target - Target value to match.
 * @param index - Current index in the numbers array.
 * @param current - Current calculated value.
 * @returns True if target is matched; otherwise, false.
 */
const canSolve = (
  numbers: number[],
  target: number,
  index: number = 0,
  current: number = numbers[0]
): boolean => {
  if (index === numbers.length - 1) {
    return current === target;
  }
  return (canSolve(numbers, target, index + 1, current + numbers[index + 1])) || (canSolve(numbers, target, index + 1, current * numbers[index + 1]));
};

/**
 * Solves the equations and determines which can be made true.
 * @param input - Multiline string with equations.
 * @returns List of solvable equations.
 */
const solveEquations = (input: string): number => {
  const equations = parseInput(input);
  return equations
    .filter(({ target, numbers }) => canSolve(numbers, target))
    .reduce((sum, { target }) => sum + target, 0);
};

const filePath = "input";
const input = readInputFromFile(filePath);
const results = solveEquations(input);
console.log(results);
