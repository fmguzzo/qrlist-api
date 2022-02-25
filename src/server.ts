import express from "express";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error";

function createServer() {
  const app = express();

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createServer;
