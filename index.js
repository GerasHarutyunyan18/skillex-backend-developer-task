const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const combinationRoute = require("./routes/combination.route");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, Express + Yarn!");
});

app.post("/api/data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.use("/api/combination", combinationRoute);

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
