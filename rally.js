"use strict";

const API_KEY = "_oQZeiOy7RgeBpyL2qUVUdQ2aWnDldEcxvzoeOIKTLk";
const API_VERSION = "v2.0";

const rally = require("rally");
const rallyQueryUtils = rally.util.query;

const rallyInstance = rally({
  server: "https://rally1.rallydev.com",
  apiKey: API_KEY,
  apiVersion: API_VERSION,
  requestOptions: {
    headers: {
      "X-RallyIntegrationName": "My cool node.js program",
      "X-RallyIntegrationVendor": "My company",
      "X-RallyIntegrationVersion": "1.0"
    }
  }
});

rallyInstance.query({
    type: 'iteration', //the type to query
    // start: 1, //the 1-based start index, defaults to 1
    // pageSize: 2, //the page size (1-200, defaults to 200)
    // limit: 10, //the maximum number of results to return- enables auto paging
    // order: 'Rank', //how to sort the results
    fetch: ['FormattedID', 'Name', 'ScheduleState', 'Children'], //the fields to retrieve
    // query: rallyQueryUtils.where('DirectChildrenCount', '>', 0), //optional filter
    scope: {
        // workspace: '/workspace/34543342431', //specify to query entire workspace
        // project: '/iteration/24797272777d', //specify to query a specific project
        // iteration: '/iteration/59317142234',
        up: false, //true to include parent project results, false otherwise
        down: true //true to include child project results, false otherwise
    },
    requestOptions: {} //optional additional options to pass through to request
}, function(error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(result.Results));
    }
});

// rallyInstance.query(
//   {
//     ref: "/hierarchicalrequirement", //the collection to query- in this case the defects on a particular story
//     start: 1, //the 1-based start index, defaults to 1
//     pageSize: 200, //the page size (1-200, defaults to 200)
//     limit: Infinity, //the maximum number of results to return- enables auto paging
//     order: "Rank", //how to sort the results
//     fetch: ["FormattedID", "Name", "State"], //the fields to retrieve
//     query: rallyQueryUtils.where("State", "<", "Closed"), //optional filter
//     requestOptions: {} //optional additional options to pass through to request
//   },
//   (err, result) => {
//     if (err) {
//       return console.error(err.toString());
//     }
//     console.log(result);
//   }
// );