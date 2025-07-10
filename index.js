const express = require("express");
const combinationRoute = require("./routes/combination.route");
const initializeDatabase = require("./db");
const config = require("./config");
var bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Welcome to the Skillex backend developer task API.");
});

app.use("/api/combination", combinationRoute);

(async () => {
  const db = await initializeDatabase();

  if (!db) {
    console.error("Failed to connect to the database.");
    process.exit(1);
  }
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
