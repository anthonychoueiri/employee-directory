const express = require("express");
const cors = require("cors");
const { postgraphile } = require("postgraphile");

require("dotenv").config();

const app = express();
const port = 8080;

const postgraphileOptions = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
};

app.use(cors());

app.use(
  postgraphile(
    process.env.DATABASE_URL,
    process.env.SCHEMA_NAME,
    postgraphileOptions
  )
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
