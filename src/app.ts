import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

import config from "config";
import createServer from "./server";

// get config variables
const port = config.get("port");

console.log("key from process.env:", process.env.ACCESS_TOKEN_PRIVATE_KEY);
console.log("key from config: ", config.get("accessTokenPrivateKey")); // no la recupera!

const app = createServer();

app.listen(port, async () => {
  log.info(`App started at port: ${port}`);
  await connectToDb();
});
