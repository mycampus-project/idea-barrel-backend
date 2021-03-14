const express = require("express");

const { getUsers } = require("../db-access/users-db");

const router = express.Router();

router.get("/", (req, res) => {
  getUsers((response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
