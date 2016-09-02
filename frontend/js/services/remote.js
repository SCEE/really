"use strict";

const service = function service ($http) {

  const url = window.location.protocol + "//" + window.location.hostname + ":8080";

  this.method = function method (slug, method, data, callback) {
    let promise = null;
    if (method === "get") {
      // get doesn't take a body
      promise = $http[method](url + "/" + slug);
    } else {
      // post/patch take a body
      promise = $http[method](url + "/" + slug, data);
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

};

module.exports = service;