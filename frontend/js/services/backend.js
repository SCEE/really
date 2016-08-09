"use strict";

const service = function service ($http) {

  const url = window.location.protocol + "//" + window.location.hostname + ":8080";

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
        return callback(`Generic error (error promise block): ${response}`);
      }
    );
  };

  this.getIterations = function getIterations (projectId, callback) {
    console.log(JSON.stringify(window.location));
    return abstractedMethod(`${url}/project/${projectId}/iterations`, "get", {}, callback);
  };

  this.getIterationStories = function getIterationStories (projectId, iterationId, callback) {
    return abstractedMethod(`${url}/project/${projectId}/iteration/${iterationId}/stories`, "get", {}, callback);
  };

  this.getIterationDefects = function getIterationDefects (projectId, iterationId, callback) {
    return abstractedMethod(`${url}/project/${projectId}/iteration/${iterationId}/defects`, "get", {}, callback);
  };
};

module.exports = service;