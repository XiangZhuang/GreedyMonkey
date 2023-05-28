import { Fruit, UserInput } from "../services/types";
import getMaxFruitValueRecursion from "../services/getMaxFruitValueRecursion";

const generateUserInput = (
  maxWeight: number,
  maxVolume: number,
  fruits: ReadonlyArray<Fruit> = []
): UserInput => {
  return { maxWeight, maxVolume, fruits };
};

describe("getMaxFruitValueRecursion", () => {
  it("should pick up no fruit if there is no fruit", () => {
    const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50);
    expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(0);
  });

  describe("when there is one fruit", () => {
    it("should pick up no fruit if fruit weight exceeds max weight", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 101, volume: 25, value: 10 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        0
      );
    });

    it("should pick up no fruit if fruit volume exceeds max volume", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 50, volume: 51, value: 10 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        0
      );
    });

    it("should pick up the fruit if both weight and volume are lower than limit", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 99, volume: 49, value: 10 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        10
      );
    });

    it("should pick up the fruit if both weight and volume are equal to limit", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 100, volume: 50, value: 10 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        10
      );
    });
  });

  describe("when there are two fruit", () => {
    it("should pick up no fruit if both exceeds limit", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 101, volume: 10, value: 30 },
        { weight: 101, volume: 30, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        0
      );
    });

    describe("when Value: A=B", () => {
      it("should pick up A/B if Weight: A+B>W", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 60, volume: 10, value: 30 },
          { weight: 60, volume: 30, value: 30 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          30
        );
      });
    });

    describe("when A has greater value than B", () => {
      it("should pick up both A and B if both of them do not exceed limit and sum of them does not exceed limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 30, volume: 10, value: 30 },
          { weight: 60, volume: 30, value: 20 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          50
        );
      });

      it("should only pick up B if A exceeds limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 101, volume: 10, value: 30 },
          { weight: 60, volume: 30, value: 20 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          20
        );
      });

      it("should pick up A if both do not exceed limit but the sum of them exceeds limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 60, volume: 10, value: 30 },
          { weight: 60, volume: 30, value: 20 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          30
        );
      });
    });

    describe("when B has greater value than A", () => {
      it("should pick up both A and B if both of them do not exceed limit and sum of them does not exceed limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 60, volume: 30, value: 20 },
          { weight: 30, volume: 10, value: 30 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          50
        );
      });

      it("should only pick up A if B exceeds limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 60, volume: 30, value: 20 },
          { weight: 30, volume: 51, value: 30 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          20
        );
      });

      it("should pick up B if both do not exceed limit but the sum of them exceeds limit", () => {
        const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
          { weight: 60, volume: 30, value: 20 },
          { weight: 30, volume: 30, value: 30 },
        ]);
        expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
          30
        );
      });
    });
  });

  describe("when there are three fruits (Value: A > B > C)", () => {
    it("should pick up B&C if Value: B+C>A & Weight: A+B>W,A+C>W,B+C<=W & Volume: B+C<=V", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 71, volume: 10, value: 60 },
        { weight: 40, volume: 10, value: 40 },
        { weight: 30, volume: 10, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        70
      );
    });

    it("should pick up A if Value: A>B+C & Weight: W>A,A+B>W,A+C>W,B+C<=W", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 71, volume: 10, value: 60 },
        { weight: 40, volume: 10, value: 40 },
        { weight: 30, volume: 10, value: 10 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        60
      );
    });

    it("should pick up A&B if Weight: A+B<=W,A+B+C>W & Volume: A+B<=V", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 60, volume: 10, value: 60 },
        { weight: 40, volume: 10, value: 40 },
        { weight: 30, volume: 10, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        100
      );
    });

    it("should pick up A&C if Weight: A+B>W,A+C<=W & Volume: A+C<=V", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 60, volume: 30, value: 60 },
        { weight: 41, volume: 15, value: 40 },
        { weight: 10, volume: 10, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        90
      );
    });

    it("should pick up A&B if Weight: A+B+C<=W & Volume: A+B<=V,A+B+C>V", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 60, volume: 30, value: 60 },
        { weight: 20, volume: 15, value: 40 },
        { weight: 10, volume: 10, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        100
      );
    });

    it("should pick up A&B&C if Weight: A+B+C<=W & Volume: A+B+C<=V", () => {
      const { maxWeight, maxVolume, fruits } = generateUserInput(100, 50, [
        { weight: 60, volume: 30, value: 60 },
        { weight: 20, volume: 10, value: 40 },
        { weight: 10, volume: 10, value: 30 },
      ]);
      expect(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits)).toEqual(
        130
      );
    });
  });
});
