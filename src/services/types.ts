export type UserInput = {
  maxWeight: number;
  maxVolume: number;
  fruits: ReadonlyArray<Fruit>;
};

export type Fruit = {
  weight: number;
  volume: number;
  value: number;
};
