"use strict";

const controller = function controller ($scope, backendService) {

  const projectId = "19220804858";
  const iterationId = "54597367827";

  $scope.iterations = [];
  $scope.currentIterationTickets = [];

  backendService.getIterations(projectId, (err, iterations) => {
    $scope.iterations = iterations;
  });

  $scope.setCurrentIteration = function setCurrentIteration (iterationId) {
    $scope.currentIterationTickets = [];
    backendService.getIterationStories(projectId, iterationId, (err, stories) => {
      if (err) return;
      $scope.currentIterationTickets = $scope.currentIterationTickets.concat(stories);
    });
    backendService.getIterationDefects(projectId, iterationId, (err, defects) => {
      if (err) return;
      $scope.currentIterationTickets = $scope.currentIterationTickets.concat(defects);
    });
  };

  $scope.setCurrentIteration(iterationId);

};

module.exports = controller;