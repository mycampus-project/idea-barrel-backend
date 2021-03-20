const config = require("../config");
const postsDb = require("./posts-db");

const { eventsContainerId } = config;
const { postsCRUD } = postsDb;

const { deletePost, newPost, updatePost, getPostById, getAllPosts } = postsCRUD(
  eventsContainerId
);

const getEvent = (cb) => {
  getAllPosts(cb);
};

const postEvent = (event, cb) => {
  newPost(event, cb);
};

const updateEvent = (event, cb) => {
  updatePost(event, cb);
};

const getEventById = (id, cb) => {
  getPostById(id, cb);
};

const deleteEvent = (id, category, cb) => {
  deletePost(id, category, cb);
};

module.exports = {
    getEvent,
    postEvent,
    updateEvent,
    getEventById,
    deleteEvent,
};
