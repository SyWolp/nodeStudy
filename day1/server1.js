const http = require("http");

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node !</h1>");
    res.end("Bye Node !");
  })
  .listen(8080);

server.on("listening", (listen) => {
  console.log("server on !");
});

server.on("error", (error) => {
  console.log("error :", error);
});
