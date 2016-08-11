"use strict";

const ueber = require("ueber");

const controller = function controller ($scope, $sce, backendService) {

  const projectId = "19220804858";
  const updateInterval = 1000 * 5;
  const youTubePlayLength = 1000 * 120;
  const scheduleStateWeCareAbout = "Accepted";

  let hasUpdatedIterationYet = false;

  const estimateYouTubes = {
    "1": {
      "id": "J_yZEQcYfYU",
      "start": 24
    },
    "2": {
      "id": "HZc0t2rZU_0",
      "start": 0
    },
    "3": {
      "id": "PoJLvtrzSrA",
      "start": 30
    },
    "5": {
      "id": "VABJaCQ2LAw",
      "start": 20
    },
    "8": {
      "id": "EZKFnpXy8-o",
      "start": 4
    }
  };

  $scope.iterations = [];
  $scope.currentIteration = null;
  $scope.currentIterationTickets = [];
  $scope.currentYouTubeUrl = null;

  $scope.manuallyUpdateIteration = function manuallyUpdateIteration () {
    hasUpdatedIterationYet = false;
    $scope.updateIteration();
  };

  $scope.updateIteration = function updateIteration () {

    console.log("Updating iteration %s (%s)...", $scope.currentIteration.Name, $scope.currentIteration.IterationId);
    backendService.getIterationTickets(projectId, $scope.currentIteration.IterationId, (err, tickets) => {
      if (err) return;

      if (!hasUpdatedIterationYet) {
        $scope.currentIterationTickets = tickets;
        hasUpdatedIterationYet = true;
        return;
      }

      let currentIterationAcceptedTickets = $scope.currentIterationTickets.filter((currentIterationTicket) => {
        return (currentIterationTicket.ScheduleState === scheduleStateWeCareAbout);
      });
      let nowAcceptedTickets = tickets.filter((nowAcceptedTicket) => {
        return (nowAcceptedTicket.ScheduleState === scheduleStateWeCareAbout);
      });
      let ticketsThatAreNowAcceptedAndWerentBefore = nowAcceptedTickets.filter((nowAcceptedTicket) => {
        return !(currentIterationAcceptedTickets.find((currentIterationAcceptedTicket) => {
          return (currentIterationAcceptedTicket.FormattedID === nowAcceptedTicket.FormattedID);
        }));
      });

      $scope.currentIterationTickets = tickets;

      if (ticketsThatAreNowAcceptedAndWerentBefore.length === 0) return;

      let estimate = ticketsThatAreNowAcceptedAndWerentBefore[0].PlanEstimate || 1;
      let estimateYouTube = estimateYouTubes[estimate.toString()];

      $scope.currentYouTubeUrl = $sce.trustAsResourceUrl(`https://www.youtube.com/embed/${estimateYouTube.id}?autoplay=1&loop=1&start=${estimateYouTube.start}&playlist=${estimateYouTube.id}`);
      setTimeout(() => {
        $scope.currentYouTubeUrl = null;
      }, youTubePlayLength);

    });
  };

  backendService.getIterations(projectId, (err, iterations) => {
    if (err) return;
    $scope.iterations = iterations;
    if ($scope.currentIteration === null) $scope.currentIteration = $scope.iterations[$scope.iterations.length - 1];
    $scope.updateIteration();
    setInterval($scope.updateIteration, updateInterval);
  });

};

module.exports = controller;