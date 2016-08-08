"use strict";

const PORT = 8080;

const restify = require("restify");
const server = restify.createServer();

server.get("/test/:name", (request, resource, next) => {
  resource.send(`Hello, ${request.params.name}.`);
  return next();
});

server.listen(PORT, function() {
  console.log("Listening at %s!", PORT);
});