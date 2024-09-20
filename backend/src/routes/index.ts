import { Express } from "express";

import authRouter from "./auth";

export function registerRoutes(app: Express) {
    app.use("/api/auth", authRouter);
}
