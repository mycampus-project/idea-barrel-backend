//const queries = require("../db-access/queries");
//const helpers = require("./helper-functions");
const config = require("../config");
//const db = require("./database");

const { bulletinsContainerId } = config;

//const { statusMsg, missingDataStr } = helpers;
//const { selectById } = queries;

const getBulletins = (cb) => {
  // db.getAll(bulletinsContainerId, (data) => {
  //   cb(data);
  // });
};

const postBulletin = (bulletin = {}, cb) => {
  // const { senderId, category, title, body } = bulletin || null;
  // if (senderId && category && title && body) {
  //   db.postToContainer(bulletinsContainerId, bulletin, cb);
  // } else {
  //   cb(
  //     statusMsg(400, {
  //       error: missingDataStr,
  //       input: bulletin,
  //     })
  //   );
  // }
};

const updateBulletin = (bulletin = {}, cb) => {
  // const { senderId, category, title, body } = bulletin || null;
  // if (senderId && category && title && body) {
  //   db.updateById(bulletinsContainerId, bulletin, cb);
  // } else {
  //   cb(
  //     statusMsg(400, {
  //       error: missingDataStr,
  //       input: bulletin,
  //     })
  //   );
  // }
}

const getBulletinById = (id, cb) => {
  // if (id) {
  //   db.getByQuery(bulletinsContainerId, selectById(id), cb);
  // } else {
  //   cb(statusMsg(400), { error: "Id missing", input: id });
  // }
};

const deleteBulletin = (id, category, cb) => {
  // if (id) {
  //   db.deleteById(bulletinsContainerId, id, category, cb);
  // } else {
  //   cb(statusMsg(400, { error: "id", input: id }));
  // }
};

module.exports = {
  getBulletins,
  postBulletin,
  deleteBulletin,
  getBulletinById,
  updateBulletin,
};
