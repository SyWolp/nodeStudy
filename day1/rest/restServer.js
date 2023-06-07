const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const users = {};

const parseHtml = async (res, html) => {
  const data = await fs.readFile(html);
  res.writeHead(200, { "Content-Type": "text/html, charset=utf-8" });
  res.end(data);
};

const restServer = http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          await parseHtml(res, path.join(__dirname, "index.html"));
        } else if (req.url === "/about") {
          await parseHtml(res, path.join(__dirname, "about.html"));
        } else if (req.url === "/users") {
          console.log(1);
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(users));
        } else if (req.url === "/qwer") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          res.end(JSON.stringify({ 이거: "거덩" }));
        }
        try {
          await parseHtml(res, path.join(__dirname, req.url));
        } catch (err) {
          res.end("404 not found");
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      } else {
        res.writeHead(404);
        return res.end("NOT FOUND");
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain, charset=utf-8" });
      res.end(err);
    }
  })
  .listen(8080);

restServer.on("listening", (listen) => {
  console.log("on server");
});

restServer.on("error", (err) => {
  console.error(err);
});
