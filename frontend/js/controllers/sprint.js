"use strict";

const ueber = require("ueber");

const controller = function controller ($scope, $sce, backendService) {

  const projectId = "19220804858";
  const updateInterval = 1000 * 5;
  const displayLength = 1000 * 30;
  const displayFlashInterval = 100;
  const scheduleStateWeCareAbout = "Accepted";

  let hasUpdatedIterationYet = false;

  $scope.iterations = [];
  $scope.currentIteration = null;
  $scope.currentIterationTickets = [];

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

      $scope.display(estimate);

    });
  };

  $scope.display = function display (estimate) {
    let el = document.getElementById("display");
    el.style.backgroundImage = `url('img/${estimate}.gif')`;
    el.style.display = "block";

    var makeComponent = () => {
      return Math.floor(Math.random() * 255).toString();
    };

    let displayFlashIntervalReference = setInterval(() => {
      document.body.style.backgroundColor = `rgb(${makeComponent()}, ${makeComponent()}, ${makeComponent()})`;
    }, displayFlashInterval);

    setTimeout(() => {
      el.style.backgroundImage = "";
      el.style.display = "none";
      document.body.style.backgroundColor = "";
      clearInterval(displayFlashIntervalReference);
    }, displayLength);
  };

  $scope.display(1);

  backendService.getIterations(projectId, (err, iterations) => {
    if (err) return;
    $scope.iterations = iterations;
    if ($scope.currentIteration === null) $scope.currentIteration = $scope.iterations[$scope.iterations.length - 1];
    $scope.updateIteration();
    setInterval($scope.updateIteration, updateInterval);
  });

};

module.exports = controller;