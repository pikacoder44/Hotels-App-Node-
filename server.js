const express = require("express");
const app = express();
const db = require("./db");


const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the restraunt. How may I help you?");
});

//Import the router files:
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000);
