const express = require("express");

const router = express.Router();

const {
  getBulletins,
  postBulletin,
  deleteBulletin,
} = require("../db-access/bulletins-db");

router.get("/", (req, res) => {
  getBulletins((response) => {
      res.statusCode = response.status;
      res.send(response.body);
  });
});

router.post("/", (req, res) => {
    const bulletin = req.body;
    postBulletin(bulletin, (response) => {
        res.statusCode = response.status;
        res.send(response.body);
    });
});

router.put("/", (req, res) => {
  // isAuthorized
});

router.delete("/", (req, res) => {
  // isAuithorized
});

module.exports = router;
