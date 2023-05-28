import { Request, Response, Router } from "express";
import getMaxFruitValueRecursion from "../services/getMaxFruitValueRecursion";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

router.get("/recursion", function (req, res) {
  const {
    body: { maxWeight, maxVolume, fruits },
  } = req;
  res.json(getMaxFruitValueRecursion(maxWeight, maxVolume, fruits));
});

export default router;
