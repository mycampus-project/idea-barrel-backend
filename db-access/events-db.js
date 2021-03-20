const queries = require("../db-access/queries");
const helpers = require("./helper-functions");
const config = require("../config");
const db = require("./database");

const { eventsContainerId } = config;

const { statusMsg, missingDataStr } = helpers;
const { selectById } = queries;

const getEvents = (cb) => {
  db.getAll(eventsContainerId, (data) => {
    cb(data);
  });
};

const postEvent = (event = {}, cb) => {
  const { senderId, category, title, body } = event || null;
  if (senderId && category && title && body) {
    db.postToContainer(eventsContainerId, event, cb);
  } else {
    cb(
      statusMsg(400, {
        error: missingDataStr,
        input: event,
      })
    );
  }
};

const updateEvent = (event = {}, cb) => {
  const { senderId, category, title, body } = event || null;
  if (senderId && category && title && body) {
    db.updateById(eventsContainerId, event, cb);
  } else {
    cb(
      statusMsg(400, {
        error: missingDataStr,
        input: event,
      })
    );
  }
}

const getEventById = (id, cb) => {
  if (id) {
    db.getByQuery(eventsContainerId, selectById(id), cb);
  } else {
    cb(statusMsg(400), { error: "Id missing", input: id });
  }
};

const deleteEvent = (id, category, cb) => {
  if (id) {
    db.deleteById(eventsContainerId, id, category, cb);
  } else {
    cb(statusMsg(400, { error: "id", input: id }));
  }
};

module.exports = {
  getEvents,
  postEvent,
  deleteEvent,
  getEventById,
  updateEvent,
};
