"use strict";

var app = require("angular").module("app");

app.service("remote", require("./remote.js"));
app.service("rally", require("./rally.js"));
app.service("github", require("./github.js"));