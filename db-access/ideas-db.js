const queries = require("../db-access/queries");
const helpers = require("./helper-functions");
const config = require("../config");
const db = require("./database");

const { ideasContainerId } = config;

const { statusMsg, missingDataStr } = helpers;
const { selectById } = queries;

const getIdeas = (cb) => {
  db.getAll(ideasContainerId, (data) => {
    cb(data);
  });
};

const postIdea = (idea = {}, cb) => {
  const { senderId, category, title, body } = idea || null;
  if (senderId && category && title && body) {
    db.postToContainer(ideasContainerId, idea, cb);
  } else {
    cb(
      statusMsg(400, {
        error: missingDataStr,
        input: idea,
      })
    );
  }
};

const updateIdea = (idea = {}, cb) => {
  const { senderId, category, title, body } = idea || null;
  if (senderId && category && title && body) {
    db.updateById(ideasContainerId, idea, cb);
  } else {
    cb(
      statusMsg(400, {
        error: missingDataStr,
        input: idea,
      })
    );
  }
};

const getIdeaById = (id, cb) => {
  if (id) {
    db.getByQuery(ideasContainerId, selectById(id), cb);
  } else {
    cb(statusMsg(400), { error: "Id missing", input: id });
  }
};

const deleteIdea = (id, category, cb) => {
  if (id) {
    db.deleteById(ideasContainerId, id, category, cb);
  } else {
    cb(statusMsg(400, { error: "id", input: id }));
  }
};

module.exports = {
  getIdeas,
  postIdea,
  deleteIdea,
  getIdeaById,
  updateIdea,
};
