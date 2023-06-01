const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const htmlFilePath = "index.html";
const distPath = path.join(__dirname, "dist");

// Serve the static files from the dist directory
app.use(express.static(distPath));

// Serve the tailwind.css file with the correct MIME type
app.get("/tailwind.css", (req, res) => {
  res.setHeader("Content-Type", "text/css");
  res.sendFile(path.join(distPath, "tailwind.css"));
});

// Configure the WebSocket server
io.on("connection", (socket) => {
  console.log("Client connected.");

  // Monitor changes to the HTML file
  const watcher = chokidar.watch(htmlFilePath);
  watcher.on("change", () => {
    console.log("The HTML file has changed.");

    // Read the updated HTML file content
    fs.readFile(htmlFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the HTML file:", err);
        return;
      }

      // Send a reload signal to the client
      socket.emit("reload");
    });
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected.");
    watcher.close();
  });
});

// Start the HTTP server
const port = 3000;
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
