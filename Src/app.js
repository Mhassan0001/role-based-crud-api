require("dotenv").config();
const express = require("express");
let app = express();
let routerRest = require("../Src/Routes/restRoutes");
let routerAuth = require("../Src/Routes/authRoutes");
let cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use("/rest", routerRest);
app.use("/auth", routerAuth);
let db = require("../Src/Db/connection");
let port = process.env.PORT || 9000;

// *============================================================

app.get("/", (req, res) => {
  res.send(" Checking Successfully.....");
});

// ?============================================================

db()
  .then(() => {
    app.listen(port, () => {
      console.log("server Connected Successfully.....");
    });
  })
  .catch((error) => {
    console.log(`connection Failed : ${error.message}`);
  });
