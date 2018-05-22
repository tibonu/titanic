"use strict";

const TAFFY = require('taffy');
const TITANIC_DATA = require('./titanicdata');

let passengers = TAFFY(TITANIC_DATA);

module.exports = passengers;