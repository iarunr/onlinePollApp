const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http").createServer(app); // app server
const io = require("socket.io")(http); //socket.io server
require("dotenv").config();
//connect to MongoDB
const { connectDB } = require("./config/db_connect");
connectDB();

// body parser and cors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/polls", require("./routes/poll"));

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
