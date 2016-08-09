"use strict";

const controller = function controller ($scope, backendService) {

  const projectId = "19220804858";
  const iterationId = "54597367827";

  $scope.iterations = [];

  backendService.getIterations(projectId, (err, iterations) => {
    $scope.iterations = iterations;
  });

};

module.exports = controller;