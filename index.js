"use strict";

const RALLY_API_KEY = "_oQZeiOy7RgeBpyL2qUVUdQ2aWnDldEcxvzoeOIKTLk";
const RALLY_API_VERSION = "v2.0";
const PORT = 8080;

const restify = require("restify");
const rallyWrapper = require("./rallyWrapper");
const server = restify.createServer();

const rallyWrapperInstance = new rallyWrapper(RALLY_API_KEY, RALLY_API_VERSION);

server.get("/iterations", (request, resource, next) => {
  return rallyWrapperInstance.getIterations((error, iterations) => {
    if (error) {
      resource.status(500);
      return resource.send("rallyWrapperInstance returned an error. Sorry.");
      return next();
    }
    resource.send(iterations);
    return next();
  });
});

server.listen(PORT, function() {
  console.log("Listening at %s!", PORT);
});