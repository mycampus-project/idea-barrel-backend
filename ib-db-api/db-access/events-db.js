const config = require("../config");
const postsDb = require("./posts-db");

const { eventsContainerId } = config;
const { postsCRUD } = postsDb;

const { deletePost, newPost, updatePostById, getPostById, getAllPosts } = postsCRUD(
  eventsContainerId
);

const getEvents = (cb) => {
  getAllPosts(cb);
};

const postEvent = (event, cb) => {
  newPost(event, cb);
};

const updateEvent = (event, cb) => {
  updatePostById(event, cb);
};

const getEventById = (id, cb) => {
  getPostById(id, cb);
};

const deleteEvent = (id, category, cb) => {
  deletePost(id, category, cb);
};

module.exports = {
    getEvents,
    postEvent,
    updateEvent,
    getEventById,
    deleteEvent,
};
