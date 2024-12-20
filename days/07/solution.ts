import { readInputFromFile } from "../utils.ts";

export type Equation = {
  target: number;
  numbers: number[];
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

  const nextNumber = numbers[index + 1];
  const concatenated = parseInt(`${current}${nextNumber}`);

  return (
    canSolve(numbers, target, index + 1, current + nextNumber) ||
    canSolve(numbers, target, index + 1, current * nextNumber) ||
    canSolve(numbers, target, index + 1, concatenated)
  );
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
const results = solveEquations(input!);
console.log(results);
