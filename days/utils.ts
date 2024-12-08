import * as fs from "node:fs";

/**
 * Reads input from a text file.
 * @param filePath - Path to the input text file.
 * @returns The content of the file as a string.
 */
export const readInputFromFile = (filePath: string): string | undefined => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};
