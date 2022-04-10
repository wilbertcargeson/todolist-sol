const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("app"));

app.use(express.static("build/contracts"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../App/index.html"`);
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Not found");
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
