import cors from "cors";
import config from "../config/config";

// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

//const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const whitelist = config.allowedAppUrl;
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      //callback(new Error("Not allowed by CORS"));
      callback(null, false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

// Reply allowOrigin '*'
export const corsAll = cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
});

// Reply allowOrigin by function
export const corsWithOptions = cors(corsOptions);
