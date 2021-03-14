const config = require("../config");

const db = require("./database");

const { usersContainerId, usersPartition } = config;

const getUsers = (cb) => {
  db.getAll(usersContainerId, cb);
};

module.exports = { getUsers };
