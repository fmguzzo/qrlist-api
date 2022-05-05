import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import config from "./config/config";
import createServer from "./utils/server";

const port = config.port;

const app = createServer();

app.listen(port, async () => {
  log.info(`App started at [http://localhost:${port}]`);
  await connectToDb();
});
