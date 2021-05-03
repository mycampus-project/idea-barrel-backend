const express = require("express");

const router = express.Router();

const {
  getIdeas,
  postIdea,
  deleteIdea,
  getIdeaById,
  updateIdea,
} = require("../db-access/ideas-db");

router.get("/", (req, res) => {
  getIdeas((response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.post("/", (req, res) => {
  const idea = req.body;
  postIdea(idea, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getIdeaById(id, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.put("/:id", (req, res) => {
  // isAuthorized
  const data = req.body;
  data.id = req.params.id;
  updateIdea(data, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  })
  
});

router.delete("/:id/:category", (req, res) => {
  // isAuthorized
  console.log("deleting,..");
  console.log(req.params);
  const id = req.params.id;
  const category = req.params.category;
  deleteIdea(id, category, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
