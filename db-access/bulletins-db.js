const config = require("../config");

const db = require("./database");

const helpers = require("./helper-functions");

const { statusMsg } = helpers;

const { bulletinsContainerId, postsPartition } = config;

const getBulletins = (cb) => {
  db.getAll(bulletinsContainerId, (data) => {
    cb(data);
  });
};

const postBulletin = (bulletin = {}, cb) => {
  const { senderId, category, title, body } = bulletin || null;
  if (senderId && category && title && body) {
    db.postToContainer(bulletinsContainerId, bulletin, cb);
  } else {
    cb(
      statusMsg(400, {
        error: "senderId, category, title or body missing",
        input: bulletin,
      })
    );
  }
};

const deleteBulletin = (bulletin = {}, cb) => {
  const { id, category } = bulletin || null;
  if (id && category) {
    db.deleteById(bulletinsContainerId, id, category);
  } else {
    cb("error!"); // TODO: create module of statusTxt
    cb(statusMsg(400, { error: "id or category missing", input: bulletin }));
  }
};

module.exports = {
  getBulletins,
  postBulletin,
  deleteBulletin,
};
