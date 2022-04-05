export default {
  port: 3030,
  mongodb: {
    // DB without docker - sudo systemctl start mongod
    url: "mongodb://localhost:27017/tutorial",
    // DB with docker - docker-compose build / docker-compose up
    //url: "mongodb://mongodb:27017/tutorial",
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
  logLevel: "info",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
  smtp: {
    user: "icqskc5mxzf3bwct@ethereal.email",
    pass: "mVSU79SbF3WmvGqy4V",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};
