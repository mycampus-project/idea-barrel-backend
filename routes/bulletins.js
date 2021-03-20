const express = require("express");

const router = express.Router();

const {
  getBulletins,
  postBulletin,
  deleteBulletin,
  getBulletinById,
  updateBulletin,
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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getBulletinById(id, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.put("/:id", (req, res) => {
  // isAuthorized
  const data = req.body;
  updateBulletin(data, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  })
  
});

router.delete("/:id/:category", (req, res) => {
  // isAuithorized
  console.log("deleting,..");
  console.log(req.params);
  const id = req.params.id;
  const category = req.params.category;
  deleteBulletin(id, category, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
