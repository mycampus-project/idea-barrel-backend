const queries = require("../db-access/queries");
const helpers = require("./helper-functions");
const db = require("./database");

const { statusMsg, missingDataStr } = helpers;
const { selectById } = queries;

const postsCRUD = (containerId) => {
  const getPosts = (cb) => {
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
    const { senderId, category, title, body } = post || null;
    if (senderId && category && title && body) {
      db.updateById(containerId, post, cb);
    } else {
      cb(
        statusMsg(400, {
          error: missingDataStr,
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
    if (id) {
      db.deleteById(containerId, id, category, cb);
    } else {
      cb(statusMsg(400, { error: "id", input: id }));
    }
  };

  return { getPosts, newPost, updatePost, getPostById, deletePost }
};

export default postsCRUD;
