const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const chokidar = require("chokidar");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const htmlFilePath = "index.html";

// Configurar o servidor de arquivos estáticos
app.use(express.static(__dirname + "/dist"));

// Rota GET para servir o arquivo index.html
app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(__dirname + "/src/index.html");
});

// Iniciar o servidor WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado.");

  // Monitorar mudanças no arquivo HTML
  const watcher = chokidar.watch(htmlFilePath);
  watcher.on("change", () => {
    console.log("O arquivo HTML foi alterado.");

    // Ler o conteúdo atualizado do arquivo HTML
    fs.readFile(htmlFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Erro ao ler o arquivo HTML:", err);
        return;
      }

      // Enviar o conteúdo do arquivo atualizado para o cliente
      socket.emit("html-update", data);
    });
  });

  // Lidar com a desconexão do cliente
  socket.on("disconnect", () => {
    console.log("Cliente desconectado.");
    watcher.close();
  });
});

// Iniciar o servidor HTTP
const port = 3000; // Porta do servidor
server.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
