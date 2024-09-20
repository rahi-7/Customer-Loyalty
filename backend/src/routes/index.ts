import { Express } from "express";

import authRouter from "./auth";
import customerRouter from "./customer";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRouter);
  app.use("/api/customers", customerRouter);
}
