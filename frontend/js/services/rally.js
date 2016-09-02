"use strict";
const async = require("async");

const service = function service (remote) {

  this.getIterations = function getIterations (projectId, callback) {
    return remote.method(`rally/project/${projectId}/iterations`, "get", {}, callback);
  };

  this.getIterationTickets = function getIterationTickets (projectId, iterationId, callback) {
    async.parallel([
      (parallelCallback) => {
        return remote.method(`rally/project/${projectId}/iteration/${iterationId}/stories`, "get", {}, parallelCallback);
      },
      (parallelCallback) => {
        return remote.method(`rally/project/${projectId}/iteration/${iterationId}/defects`, "get", {}, parallelCallback);
      }
    ], function (err, stuff) {
      return callback(err, [].concat.apply([], stuff));
    });
  };

};

module.exports = service;