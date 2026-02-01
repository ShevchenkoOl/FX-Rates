import { ratesCache } from "./cache/rates.cache";
import express, { NextFunction, Request, Response } from "express";
import path from 'path';

const app = express();
const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, '../public')));

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).header("Content-Type", "text/plain").send("OK");
});

const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
  const userKey = req.headers["x-api-key"];
  userKey === API_KEY
    ? next()
    : res
        .status(401)
        .json({
          error: "Unauthorized",
          message: "Chybějící nebo špatný API klíč",
        });
};

app.get("/rates", authMiddlware, (req: Request, res: Response) => {
  const rates = ratesCache.getAllRates();
  res.json(rates);
});

app.get("/rates/:code", authMiddlware, (req: Request, res: Response) => {
  const rawCode = req.params.code;

  if (typeof rawCode !== "string") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Kód měny musí být řetězec",
    });
  }

  const code = rawCode.toUpperCase();
  const rate = ratesCache.getRateByCode(code);

  rate ? res.json(rate) : res.status(404).json({error: "Not Found", message: `Měna ${code} nebyla nalezena`});
});

export default app;
