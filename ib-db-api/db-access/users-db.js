const queries = require("../db-access/queries");
const helpers = require("./helper-functions");
const config = require("../config");
const db = require("./database");

const { statusMsg } = helpers;
const { selectById } = queries;

const { usersContainerId } = config;

const getUsers = (cb) => {
  db.getAll(usersContainerId, cb);
};

const getUserById = (id, cb) => {
  if (id) {
    db.getByQuery(usersContainerId, selectById(id), cb);
  } else {
    cb(statusMsg(400, { message: "id missing", input: id }));
  }
};

module.exports = { getUsers, getUserById };
