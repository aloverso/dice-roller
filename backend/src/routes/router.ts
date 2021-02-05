import { Request, Response, Router } from "express";
import { RollDie } from "../domain/types";
import { Roll } from "../domain/Roll";

interface RouterActions {
  rollDie: RollDie;
}

export const routerFactory = ({ rollDie }: RouterActions): Router => {
  const router = Router();

  router.get("/roll/:die", (req: Request, res: Response<Roll>) => {
    let count = 1;
    if (req.query.count) {
      count = parseInt(req.query.count as string);
    }
    rollDie(req.params.die.toLowerCase(), count)
      .then((roll: Roll) => {
        res.status(200).json(roll);
      })
      .catch(() => {
        res.status(500).send();
      });
  });

  return router;
};
