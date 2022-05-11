const express = require("express");
const { postgraphile } = require("postgraphile");

require("dotenv").config();

const app = express();
const port = 8080;

app.use(
  postgraphile(process.env.DATABASE_URL, process.env.SCHEMA_NAME, {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
