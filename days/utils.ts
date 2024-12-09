import * as fs from "node:fs";
import { Equation } from "./types.ts";

export const readInputFromFile = (filePath: string): string | undefined => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

export const parseInputEquations = (input: string): Equation[] => {
  return input.split("\n").map((line) => {
    const [target, numbers] = line.split(":");
    return {
      target: parseInt(target.trim()),
      numbers: numbers.trim().split(" ").map(Number),
    };
  });
};

export const readListsFromFile = (
  filePath: string
): { leftList: number[]; rightList: number[] } => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.trim().split("\n");

  const leftList: number[] = [];
  const rightList: number[] = [];

  for (const line of lines) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
  }

  return { leftList, rightList };
};
