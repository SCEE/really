"use strict";

var log = function log (text) {
  document.getElementById("log-element").innerHTML += text + "\n";
};

var request = function request (url, callback) {
  var request = $.ajax({
    url: url,
    method: "GET"
  });
  request.done(function (data) {
    return callback(false, data);
  });
  request.fail(function(jqXHR, textStatus) {
    return callback("Request failed: " + textStatus);
  });
};

window.onload = function () {
  request("http://localhost:8080/project/19220804858/iterations", function (err, iterations) {
    log("Iterations:");
    iterations.forEach(function (iteration) {
      log("  " + iteration.Name + " (" + iteration.IterationId + ")");
    });
  });
};