"use strict";
const request = require("request");

const wrapper = function wrapper (remote, apiKey) {

  let _self = this;
  _self.remote = remote;
  _self.apiKey = apiKey;

  const getPullRequests = function getPullRequests (owner, repo, callback) {

    let options = {
      "url": `${_self.remote}/api/v3/repos/${owner}/${repo}/pulls`,
      "auth": {
        "user": _self.apiKey,
      }
    };

    return request(options, function (err, res, body) {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(`statusCode not 200 (${res.statusCode})`);
      return callback(false, JSON.parse(body));
    });

  };

  return {
    getPullRequests
  };

};

module.exports = wrapper;