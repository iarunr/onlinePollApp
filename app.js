const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/poll", require("./routes/poll"));



const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));




