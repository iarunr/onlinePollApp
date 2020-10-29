const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

module.exports = {
  connectDB: function () {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      })
      .then((conn) => {
        console.log(`Databse connected to ${conn.connection.host}`);
      })
      .catch((err) => console.log(err));
  },
};
