"use strict";

const ueber = require("ueber");
const Chartist = require("chartist");

const controller = function controller ($scope, $sce, backendService) {

  const projectId = "19220804858";
  const updateInterval = 1000 * 5;
  const displayLength = 1000 * 30;
  const scheduleStateWeCareAbout = "Accepted";

  $scope.iterations = [];

  $scope.previousIteration = null;
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

  $scope.drawChart = function () {
    let data = ueber.groupifyCount($scope.currentIterationTickets, "ScheduleState");
    var chartData = {
      labels: data.map(dataElement => dataElement.name),
      series: data.map(dataElement => dataElement.count)
    };
    new Chartist.Pie('#chart', chartData, {});
  };

  $scope.updateIteration = function updateIteration () {

    console.log("Updating iteration %s (%s)...", $scope.currentIteration.Name, $scope.currentIteration.IterationId);
    backendService.getIterationTickets(projectId, $scope.currentIteration.IterationId, (err, tickets) => {
      if (err) return;

      if (
        $scope.previousIteration === null
        ||
        (
          $scope.previousIteration !== null && $scope.previousIteration.IterationId !== $scope.currentIteration.IterationId
        )
      ) {
        $scope.currentIterationTickets = tickets;
        $scope.previousIteration = $scope.currentIteration;
        $scope.drawChart();
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
      $scope.drawChart();

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
      document.getElementById("woof").pause();
      document.getElementById("woof").currentTime = 0;
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