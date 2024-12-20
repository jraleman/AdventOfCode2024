import { readInputFromFile} from '../utils.ts';

type Rule = [number, number];

const parseInput = (input: string): { rules: Rule[]; updates: number[][] } => {
  const [rulesSection, updatesSection] = input.split("\n\n");
  const rules = rulesSection.split("\n").map((line) => {
    const [before, after] = line.split("|").map(Number);
    return [before, after] as Rule;
  });

  const updates = updatesSection.split("\n").map((line) =>
    line.split(",").map(Number)
  );

  return { rules, updates };
};

const isValidUpdate = (update: number[], rules: Rule[]): boolean => {
  const pageIndices = new Map<number, number>();
  update.forEach((page, index) => pageIndices.set(page, index));

  for (const [before, after] of rules) {
    const beforeIndex = pageIndices.get(before);
    const afterIndex = pageIndices.get(after);

    // If both pages are in the update, check the order
    if (
      beforeIndex !== undefined &&
      afterIndex !== undefined &&
      beforeIndex >= afterIndex
    ) {
      return false;
    }
  }

  return true;
};

const getMiddlePage = (update: number[]): number => {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
};

const solve = (input?: string): number => {
  if (!input) return 0;
  const { rules, updates } = parseInput(input);

  let middleSum = 0;

  for (const update of updates) {
    if (isValidUpdate(update, rules)) {
      middleSum += getMiddlePage(update);
    }
  }

  return middleSum;
};


const input = readInputFromFile('./input');

const solution = solve(input);
console.log(solution);
