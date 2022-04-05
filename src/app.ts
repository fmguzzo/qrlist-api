import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import config from "./config/config";
import createServer from "./server";

// get config variables
const port = config.port;

//console.log("key from config: ", config.get<string>("accessTokenPrivateKey")); // no la recupera!

const app = createServer();

app.listen(port, async () => {
  log.info(`App started at [http://localhost:${port}]`);
  await connectToDb();
});
