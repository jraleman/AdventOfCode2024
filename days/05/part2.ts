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

const reorderUpdate = (update: number[], rules: Rule[]): number[] => {
  // Build the graph and in-degree map for the update
  const graph = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  update.forEach((page) => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });

  rules.forEach(([before, after]) => {
    if (update.includes(before) && update.includes(after)) {
      graph.get(before)?.push(after);
      inDegree.set(after, (inDegree.get(after) || 0) + 1);
    }
  });

  // Perform topological sort
  const queue: number[] = [];
  const sorted: number[] = [];

  inDegree.forEach((degree, page) => {
    if (degree === 0) queue.push(page);
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);

    for (const neighbor of graph.get(current) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sorted;
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
    if (!isValidUpdate(update, rules)) {
      const reorderedUpdate = reorderUpdate(update, rules);
      middleSum += getMiddlePage(reorderedUpdate);
    }
  }

  return middleSum;
};

const filePath = "input";
const input = readInputFromFile(filePath);

const result = solve(input);
console.log(`Sum of middle pages of reordered updates: ${result}`);
