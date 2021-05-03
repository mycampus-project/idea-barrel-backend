const config = require("../config");
const postsDb = require("./posts-db");

const { ideasContainerId } = config;
const { postsCRUD } = postsDb;

const { deletePost, newPost, updatePost, getPostById, getAllPosts, updatePostById } = postsCRUD(
    ideasContainerId
);

const getIdeas = (cb) => {
  getAllPosts(cb);
};

const postIdea = (idea, cb) => {
  newPost(idea, cb);
};

const updateIdea = (idea, cb) => {
  updatePostById(idea, cb);
};

const getIdeaById = (id, cb) => {
  getPostById(id, cb);
};

const deleteIdea = (id, category, cb) => {
  deletePost(id, category, cb);
};

module.exports = {
    getIdeas,
    postIdea,
    updateIdea,
    getIdeaById,
    deleteIdea,
};
