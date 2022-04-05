import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/config";
import log from "../utils/logger";

// from v6+ does not exist in ConnectOptions (useUnifiedTopology y useNewUrlParser)
// these options are NO longer required, as they have been included as defaults.

/**
 * for other options admited we will use:
 * const mongodb: {
 *   url: string;
 *   options: ConnectOptions;
 * } = "mongodb";
 **/

/**
 * At the moment we leave those options in config
 * and cast (config.mongodb.options as ConnectOptions)
 * to avoid type error.
 * In future we will eliminate this options and connect
 * only with uri. We will define others options available
 * if it's necesary
 **/

async function connectToDb() {
  try {
    const db = await mongoose.connect(
      config.mongodb.uri as string,
      config.mongodb.options as ConnectOptions
    );
    log.info(
      `MongoDB Connected on [Host: ${db.connection.host}] [DB: ${db.connection.name}]`
    );
  } catch (err: any) {
    log.error(`Could not connect to Database: ${err.message}`);
    process.exit(1);
  }
}

export default connectToDb;
