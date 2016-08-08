"use strict";

const RALLY_API_KEY = process.env.RALLY_API_KEY || "";
const RALLY_API_VERSION = "v2.0";
const PORT = 8080;

const restify = require("restify");
const rallyWrapper = require("./rallyWrapper");
const server = restify.createServer();

const rallyWrapperInstance = new rallyWrapper(RALLY_API_KEY, RALLY_API_VERSION);

server.get("/project/:projectId/iterations", (request, resource, next) => {
  return rallyWrapperInstance.getIterations(request.params.projectId, (error, iterations) => {
    if (error) {
      console.log(error);
      resource.status(500);
      return resource.send("rallyWrapperInstance returned an error. Sorry.");
      return next();
    }
    resource.send(iterations);
    return next();
  });
});

server.get("/project/:projectId/iteration/:iterationId", (request, resource, next) => {
  return rallyWrapperInstance.getIterationTickets(request.params.projectId, request.params.iterationId, (error, tickets) => {
    if (error) {
      console.log(error);
      resource.status(500);
      return resource.send("rallyWrapperInstance returned an error. Sorry.");
      return next();
    }
    resource.send(tickets);
    return next();
  });
});

server.listen(PORT, function() {
  console.log("Listening at %s!", PORT);
});