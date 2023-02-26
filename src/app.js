const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.set("strictQuery", false);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../public/views"));
//routes
app.use(require("./routes/index.routes"));

app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log("Server on port" + port);
});
