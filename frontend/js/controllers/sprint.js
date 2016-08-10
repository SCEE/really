"use strict";

const controller = function controller ($scope, backendService) {

  const projectId = "19220804858";
  const iterationId = "54597367827";
  const updateInterval = 1000 * 10; // 10 seconds

  $scope.iterations = [];
  $scope.currentIterationTickets = [];

  backendService.getIterations(projectId, (err, iterations) => {
    $scope.iterations = iterations;
  });

  const updateIteration = function updateIteration () {
    console.log("Updating iteration...");
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

  updateIteration();
  setInterval(updateIteration, updateInterval);

};

module.exports = controller;