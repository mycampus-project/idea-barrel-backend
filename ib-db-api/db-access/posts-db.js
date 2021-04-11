const queries = require("../db-access/queries");
const helpers = require("./helper-functions");
const db = require("./database");

const { statusMsg, missingDataStr } = helpers;
const { selectById } = queries;

// Every post route uses this set of functions as a base.

// All posts should have at least a senderId, category, title and body -properties.
// Other validation logic should happen in their own respective db modules.

const postsCRUD = (containerId) => {
  const getAllPosts = (cb) => {
    db.getAll(containerId, (data) => {
      cb(data);
    });
  };

  const newPost = (post = {}, cb) => {
    const { senderId, category, title, body } = post || null;
    if (senderId && category && title && body) {
      db.postToContainer(containerId, post, cb);
    } else {
      cb(
        statusMsg(400, {
          error: missingDataStr,
          input: post,
        })
      );
    }
  };

  const updatePost = (post = {}, cb) => {
    const { senderId, category, title, body, id } = post || null;
    if (senderId && category && title && body && id) {
      db.updateById(containerId, post, cb);
    } else {
      cb(
        statusMsg(400, {
          error: "id, " + missingDataStr,
          input: post,
        })
      );
    }
  };

  const getPostById = (id, cb) => {
    if (id) {
      db.getByQuery(containerId, selectById(id), cb);
    } else {
      cb(statusMsg(400), { error: "Id missing", input: id });
    }
  };

  const deletePost = (id, category, cb) => {
    if (id && category) {
      db.deleteById(containerId, id, category, cb);
    } else {
      cb(statusMsg(400, { error: "id missing", input: id }));
    }
  };

  return { getAllPosts, newPost, updatePost, getPostById, deletePost };
};

module.exports = { postsCRUD };
