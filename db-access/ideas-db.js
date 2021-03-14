const config = require("../config");

const db = require("./database");

const helpers = require("./helper-functions");

const { statusMsg } = helpers();

const { ideasContainerId, postsPartition } = config;
