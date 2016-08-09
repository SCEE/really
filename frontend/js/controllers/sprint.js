"use strict";

const controller = function controller ($scope, backendService) {

  $scope.iterations = [];

  backendService.getIterations("19220804858", (err, iterations) => {
    $scope.iterations = iterations;
  });

};

module.exports = controller;