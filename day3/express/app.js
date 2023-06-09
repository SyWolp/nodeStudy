const express = require("express");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3001);

app.use((req, res, next) => {
  console.log("미들웨어 실행");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} on`);
});
