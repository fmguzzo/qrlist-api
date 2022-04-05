import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGODB_URI,
    // this options does not exist in mongoose v6+
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  logLevel: "info",
  saltWorkFactor: 10,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};
