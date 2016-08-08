"use strict";

const rally = require("rally");
const rallyQueryUtils = rally.util.query;

const rallyWrapper = function rallyWrapper (apiKey, apiVersion) {

  const rallyInstance = rally({
    server: "https://rally1.rallydev.com",
    apiKey: apiKey,
    apiVersion: apiVersion,
    requestOptions: {
      headers: {
        "X-RallyIntegrationName": "My cool node.js program",
        "X-RallyIntegrationVendor": "My company",
        "X-RallyIntegrationVersion": "1.0"
      }
    }
  });

  const getIterations = function getIterations (callback) {
    rallyInstance.query({
        type: 'iteration', //the type to query
        // start: 1, //the 1-based start index, defaults to 1
        // pageSize: 2, //the page size (1-200, defaults to 200)
        // limit: 10, //the maximum number of results to return- enables auto paging
        // order: 'Rank', //how to sort the results
        // query: rallyQueryUtils.where('DirectChildrenCount', '>', 0), //optional filter
        fetch: ['FormattedID', 'Name', 'ScheduleState', 'Children'], //the fields to retrieve
        scope: {
            project: '/project/19220804858', //specify to query a specific project
            up: false, //true to include parent project results, false otherwise
            down: false //true to include child project results, false otherwise
        },
        requestOptions: {} //optional additional options to pass through to request
    }, function(error, result) {
        if (error) return callback(error);
        return callback(false, result.Results);
    });
  };

  const getTickets = function getTickets (iteration, callback) {
    return callback(false, []);
  };

  return {
    getIterations,
    getTickets
  };

};

module.exports = rallyWrapper;