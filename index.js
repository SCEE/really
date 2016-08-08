"use strict";

const PORT = 8080;

const restify = require("restify");
const server = restify.createServer();

server.get("/hello/:name", (request, resource, next) => {
  resource.send("Hello, World.");
  return next();
});

server.listen(PORT, function() {
  console.log("Listening at %s!", PORT);
});