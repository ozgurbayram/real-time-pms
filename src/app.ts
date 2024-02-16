import bodyParser from "body-parser";
import "dotenv/config";
import { Express } from "express";
import passport from "passport";
import path from "path";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { ErrorHandler } from "./core/middlewares/error-handler.middleware";
import { AppDataSource } from "./integrations/database";
import { initPassport } from "./modules/auth/passport.config";


const controllersPath = path.join(
  __dirname,
  "modules",
  "**",
  "controllers",
  "*.controller{.ts,.js}"
);

class App {
  public express: Express;

  constructor() {
    this.express = createExpressServer({
      controllers: [controllersPath],
      routePrefix: "/api",
      middlewares: [bodyParser.json(), ErrorHandler, passport.initialize()],
      defaultErrorHandler: false,
      cors:true,
      currentUserChecker: async (action) => {
        return action.request.user;
      },
    });
    this.initializeDatabase();
    this.initializePassport();
  }

  private initializePassport() {
    initPassport();
  }

  private initializeDatabase(): void {
    AppDataSource.initialize()
      .then(() => {})
      .catch((err) => console.error("db connection error", err));
  }
}

export default App;
