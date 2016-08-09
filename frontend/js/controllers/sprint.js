"use strict";

const controller = function controller ($scope, backendService) {

  const projectId = "19220804858";
  const iterationId = "54597367827";

  $scope.iterations = [];
  $scope.currentIterationStories = null;

  backendService.getIterations(projectId, (err, iterations) => {
    $scope.iterations = iterations;
  });

  $scope.setCurrentIteration = function setCurrentIteration (iterationId) {
    backendService.getIterationStories(projectId, iterationId, (err, stories) => {
      $scope.currentIterationStories = stories;
    });
  };

  $scope.setCurrentIteration(iterationId);

};

module.exports = controller;