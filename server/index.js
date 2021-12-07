const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const con = require("./config/db.config")

var corsOptions = {
  origin: "http://localhost:3000"
};
const adminRouter = require("./routes/admin")
const receptionRouter = require("./routes/reception")

// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()
})

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/admin", adminRouter)
app.use("/reception", receptionRouter)

app.listen(3001, function() {
  console.log("server listening on port 3001")
})
