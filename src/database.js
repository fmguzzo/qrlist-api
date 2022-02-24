const mongoose = require('mongoose');
// localhost
// mongoose.connect("mongodb://localhost/mydatabase")
// sevices name
//mongoose.connect("mongodb://mongodb/mydatabase", {
mongoose.connect("mongodb://admin:password@mongodb:27017", {
  useUnifiedTopology: true,
} )
  .then((db) => console.log("DB is connected to:", db.connection.host))
  .catch(err => console.error(err))