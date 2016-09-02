"use strict";

const rally = require("rally");
const rallyQueryUtils = rally.util.query;

const wrapper = function wrapper (apiKey, apiVersion) {

  const rallyInstance = rally({
    apiKey: apiKey,
    apiVersion: apiVersion,
    requestOptions: {
      headers: {}
    }
  });

  const getIdFromRef = function getIdFromRef (ref) {
    return ref.split("/").pop();
  };

  const getIterations = function getIterations (projectId, callback) {
    const fields = ['FormattedID', 'Name'];
    rallyInstance.query({
      type: 'iteration',
      fetch: fields,
      scope: {
        project: `/project/${projectId}`,
        up: false,
        down: false
      },
      requestOptions: {}
    }, function(error, result) {
      if (error) return callback(error);
      result.Results = result.Results.map((result) => {
        result.IterationId = getIdFromRef(result._ref);
        return result;
      });
      return callback(false, result.Results);
    });
  };

  const getIterationStories = function getIterationStories (projectId, iterationId, callback) {
    const fields = ['FormattedID', 'Name', 'ScheduleState', 'PlanEstimate', 'Children'];
    rallyInstance.query({
      type: 'hierarchicalrequirement',
      order: 'DragAndDropRank',
      query: rallyQueryUtils.where('Iteration.ObjectID', '=', iterationId),
      fetch: fields,
      scope: {
        project: `/project/${projectId}`,
        up: false,
        down: false
      }
    },
    function (error, result) {
      if (error) {
        return callback(error);
      }
      result.Results = result.Results.map((result) => {
        result.IterationId = iterationId;
        return result;
      });
      return callback(false, result.Results);
    });
  };

  const getIterationDefects = function getIterationDefects (projectId, iterationId, callback) {
    const fields = ['FormattedID', 'Name', 'ScheduleState', 'PlanEstimate', 'Children'];
    rallyInstance.query({
      type: 'defect',
      order: 'DragAndDropRank',
      query: rallyQueryUtils.where('Iteration.ObjectID', '=', iterationId),
      fetch: fields,
      scope: {
        project: `/project/${projectId}`,
        up: false,
        down: false
      }
    },
    function (error, result) {
      if (error) {
        return callback(error);
      }
      result.Results = result.Results.map((result) => {
        result.IterationId = iterationId;
        return result;
      });
      return callback(false, result.Results);
    });
  }

  return {
    getIterations,
    getIterationStories,
    getIterationDefects
  };

};

module.exports = wrapper;