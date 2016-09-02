"use strict";

const PORT = 8080;

//
// GET READY
//
const restify = require("restify");
const server = restify.createServer();
server.use(
  function crossOrigin (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

//
// RALLY
//

const RALLY_API_KEY = process.env.RALLY_API_KEY || "";
const RALLY_API_VERSION = "v2.0";
const rallyWrapper = require("./wrappers/rally");
const rallyWrapperInstance = new rallyWrapper(RALLY_API_KEY, RALLY_API_VERSION);

server.get("/rally/project/:projectId/iterations", (request, resource, next) => {
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

server.get("/rally/project/:projectId/iteration/:iterationId/stories", (request, resource, next) => {
  return rallyWrapperInstance.getIterationStories(request.params.projectId, request.params.iterationId, (error, tickets) => {
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

server.get("/rally/project/:projectId/iteration/:iterationId/defects", (request, resource, next) => {
  return rallyWrapperInstance.getIterationDefects(request.params.projectId, request.params.iterationId, (error, tickets) => {
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

//
// GO
//
server.listen(PORT, function () {
  console.log("Listening on port %s.", PORT);
});