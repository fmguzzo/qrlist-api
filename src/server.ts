import express from "express";
import helmet from "helmet";
import router from "./routes/v1";
import { errorHandler, notFoundHandler } from "./middlewares/error";

function createServer() {
  const app = express();

  // set security HTTP headers
  app.use(helmet());

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  //app.use(xss());
  //app.use(mongoSanitize());

  // v1 api routes
  app.use("/api/v1", router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createServer;
