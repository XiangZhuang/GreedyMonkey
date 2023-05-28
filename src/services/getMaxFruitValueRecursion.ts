import { Fruit } from "./types";

type Memory = Array<Array<Array<number | undefined>>>;

function recursion(
  n: number,
  remainingWeight: number,
  remainingVolume: number,
  fruits: ReadonlyArray<Fruit>,
  memory: Memory
): number {
  if (n < 0 || remainingWeight <= 0 || remainingVolume <= 0) return 0;

  const memorizedValue = memory[n]?.[remainingWeight]?.[remainingVolume];
  if (memorizedValue !== undefined) {
    return memorizedValue;
  }

  const valueWithoutN = recursion(
    n - 1,
    remainingWeight,
    remainingVolume,
    fruits,
    memory
  );

  const fruitN = fruits[n];
  if (fruitN.weight <= remainingWeight && fruitN.volume <= remainingVolume) {
    const valueWithN =
      fruitN.value +
      recursion(
        n - 1,
        remainingWeight - fruitN.weight,
        remainingVolume - fruitN.volume,
        fruits,
        memory
      );
    return Math.max(valueWithN, valueWithoutN);
  }
  memory[n][remainingWeight][remainingVolume] = valueWithoutN;
  return valueWithoutN;
}

export default function getMaxFruitValueRecursion(
  maxWeight: number,
  maxVolume: number,
  fruits: ReadonlyArray<Fruit>
): number {
  const memory: Memory = new Array(fruits.length)
    .fill(null)
    .map(() =>
      new Array(maxWeight)
        .fill(null)
        .map(() => new Array(maxVolume).fill(undefined))
    );
  return recursion(fruits.length - 1, maxWeight, maxVolume, fruits, memory);
}
