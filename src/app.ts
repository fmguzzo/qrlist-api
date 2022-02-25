import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import config from "config";
import createServer from "./server";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// get config variables
const port = config.get("port");

const app = createServer();

app.listen(port, async () => {
  log.info(`App started at port: ${port}`);
  await connectToDb();
});
