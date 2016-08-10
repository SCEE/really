"use strict";

const async = require("async");

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
    return abstractedMethod(`${url}/project/${projectId}/iterations`, "get", {}, callback);
  };

  this.getIterationTickets = function getIterationTickets (projectId, iterationId, callback) {
    async.parallel([
      (parallelCallback) => {
        return abstractedMethod(`${url}/project/${projectId}/iteration/${iterationId}/stories`, "get", {}, parallelCallback);
      },
      (parallelCallback) => {
        return abstractedMethod(`${url}/project/${projectId}/iteration/${iterationId}/defects`, "get", {}, parallelCallback);
      }
    ], function (err, stuff) {
      return callback(err, [].concat.apply([], stuff));
    });
  };

};

module.exports = service;