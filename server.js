/**
 * server.js
 * 
 * Cria e inicia o servidor JSON Server.
 */

// Configura o servidor
const jsonServer = require("json-server");

// Cria o servidor
const server = jsonServer.create();

// Define o roteamento
const router = jsonServer.router("db.json");

// Define os middlewares
const middlewares = jsonServer.defaults();

// Adiciona os middlewares
server.use(middlewares);

// Define o rewriter
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

// Define o roteamento
server.use(router);

// Inicia o servidor
server.listen(3005, () => {
  console.log("JSON Server is running");
});

// Exporta o servidor
module.exports = server;
