"use strict";

const angular = require("angular");
const angularSanitize = require("angular-sanitize");

const app = require("angular").module("app", ["ngSanitize"]);
require("./services");
require("./controllers");