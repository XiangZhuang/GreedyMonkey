export type UserInput = {
  maxWeight: number;
  maxVolume: number;
  fruits: Array<Fruit>;
};

export type Fruit = {
  weight: number;
  volume: number;
  value: number;
};
