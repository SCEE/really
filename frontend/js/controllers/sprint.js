"use strict";

const ueber = require("ueber");

const controller = function controller ($scope, $sce, backendService) {

  const projectId = "19220804858";
  const updateInterval = 1000 * 5;
  const displayLength = 1000 * 30;
  const scheduleStateWeCareAbout = "Accepted";

  let hasUpdatedIterationYet = false;


  $scope.iterations = [];
  $scope.currentIteration = null;
  $scope.currentIterationTickets = [];
  $scope.currentMp3Url = null;

  const estimateMp3StartTimesSeconds = {
    "1": {
      "start": 24
    },
    "2": {
      "start": 0
    },
    "3": {
      "start": 30
    },
    "5": {
      "start": 20
    },
    "8": {
      "start": 4
    }
  };

  $scope.manuallyUpdateIteration = function manuallyUpdateIteration () {
    hasUpdatedIterationYet = false;
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


      $scope.display(estimate);

    });
  };

  $scope.display = function display (estimate) {
    $scope.currentMp3Url = `audio/${estimate}.mp3`;
    document.getElementById("woof").onplay = function() {
      this.currentTime = estimateMp3StartTimesSeconds[estimate.toString()].start;
      console.log(`this.currentTime = ${this.currentTime}`);
    }

    let el = document.getElementById("display");
    el.style.backgroundImage = `url('img/${estimate}.gif')`;
    el.style.display = "block";

    setTimeout(() => {
      el.style.backgroundImage = "";
      el.style.display = "none";
      $scope.currentMp3Url = null;
    }, displayLength);
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