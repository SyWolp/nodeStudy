const http = require("http");

const server = http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "hello=wolrd" });
    res.end("cookie test");
  })
  .listen(8081);

server.on("listening", () => {
  console.log(8081 + "on");
});

server.on("error", (err) => {
  console.error(err);
});
