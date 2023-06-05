const http = require("http");
const fs = require("fs").promises;

const server2 = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { "Content-Type": "text/html, charset=utf-8" });
      const data = await fs.readFile("./server2.html");
      res.end(data);
    } catch (err) {
      console.error(err);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Error");
    }
  })
  .listen(8081);

server2.on("listening", (listen) => {
  console.log("server2 on");
});

server2.on("error", (error) => {
  console.log(error);
});
