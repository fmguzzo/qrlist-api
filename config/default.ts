export default {
  port: 3000,
  mongodb: {
    url: "mongodb://mongodb:27017/tutorial",
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  smtp: {
    user: "icqskc5mxzf3bwct@ethereal.email",
    pass: "mVSU79SbF3WmvGqy4V",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};
