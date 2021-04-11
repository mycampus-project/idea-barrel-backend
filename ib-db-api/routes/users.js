const express = require("express");

const { getUsers, getUserById } = require("../db-access/users-db");

const router = express.Router();

router.get("/", (req, res) => {
  getUsers((response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getUserById(id, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
