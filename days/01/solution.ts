import { readListsFromFile } from "../utils.ts";

function calculateTotalDistance(
  leftList: number[],
  rightList: number[]
): number {
  const rightListCounts = rightList.reduce((map, num) => {
    map.set(num, (map.get(num) || 0) + 1);
    return map;
  }, new Map<number, number>());

  return leftList.reduce((total, num) => {
    const count = rightListCounts.get(num) || 0;
    return total + num * count;
  }, 0);
}

const filePath = "input";
const { leftList, rightList } = readListsFromFile(filePath);
const totalDistance = calculateTotalDistance(leftList, rightList);
console.log(totalDistance);
