"use strict";

const service = function service ($http) {

  const abstractedMethod = function abstractedMethod (url, method, data, callback) {
    let promise = null;
    if (method === "get") {
      // get doesn't take a body
      promise = $http[method](url);
    } else {
      // post/patch take a body
      promise = $http[method](url, data);
    }
    return promise.then(
      function success (response) {
        if (response.status !== 200) {
          return callback(`Backend server returned ${response.status} status code.`);
        }
        return callback(false, response.data);
      },
      function error (response) {
        return callback("Generic error (error promise block)");
      }
    );
  };

  this.getIterations = function getIterations (projectId, callback) {
    return abstractedMethod(`http://localhost:8080/project/${projectId}/iterations`, "get", {}, callback);
  };

  this.getIterationStories = function getIterationStories (projectId, iterationId, callback) {
    return callback(false, []);
  };

  this.getIterationDefects = function getIterationDefects (projectId, iterationId, callback) {
    return callback(false, []);
  };

};

module.exports = service;