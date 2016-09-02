"use strict";
const async = require("async");

const service = function service (remote) {

  this.getPullRequests = function getIterations (owner, repo, callback) {
    return remote.method(`github/owner/${owner}/repo/${repo}/pull-requests`, "get", {}, callback);
  };

};

module.exports = service;