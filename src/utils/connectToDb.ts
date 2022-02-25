import mongoose, { ConnectOptions } from "mongoose";
import config from "config";
import log from "../utils/logger";

async function connectToDb() {
  const mongodb = config.get<{
    url: string;
    options: ConnectOptions;
  }>("mongodb");

  try {
    const db = await mongoose.connect(mongodb.url, mongodb.options);
    log.info(
      `MongoDB Connected on [Host: ${db.connection.host}] [DB: ${db.connection.name}]`
    );
  } catch (err: any) {
    log.error(`Could not connect to Database: ${err.message}`);
    process.exit(1);
  }
}

export default connectToDb;
