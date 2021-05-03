const config = require("../config");
const postsDb = require("./posts-db");

const { bulletinsContainerId } = config;
const { postsCRUD } = postsDb;

const { deletePost, newPost, getPostById, getAllPosts, updatePostById } = postsCRUD(
  bulletinsContainerId
);

const getBulletins = (cb) => {
  getAllPosts(cb);
};

const postBulletin = (bulletin, cb) => {
  newPost(bulletin, cb);
};

const updateBulletin = (bulletin, cb) => {
  updatePostById(bulletin, cb);
};

const getBulletinById = (id, cb) => {
  getPostById(id, cb);
};

const deleteBulletin = (id, category, cb) => {
  deletePost(id, category, cb);
};

module.exports = {
  getBulletins,
  postBulletin,
  deleteBulletin,
  getBulletinById,
  updateBulletin,
};
