const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(process.pid);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(worker.process.pid);
    console.log(code, signal);
    // cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>hello wolrd</h1>");
      res.end("hello");
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
    .listen(8086);

  console.log(process.pid);
}
