const http = require("http");
const fs = require("fs");
const path = require("path");
const { handler } = require("./netlify/functions/waitlist");

const PORT = 5000;
const HOST = "0.0.0.0";

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/.netlify/functions/waitlist")) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const event = {
          httpMethod: req.method,
          headers: req.headers,
          body: body || null,
        };
        const result = await handler(event);
        res.writeHead(result.statusCode, result.headers || {});
        res.end(result.body || "");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "error", message: err.message }));
      }
    });
    return;
  }

  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const mime = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
