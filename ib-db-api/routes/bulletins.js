const express = require("express");

const router = express.Router();

const { upload, deleteFile } = require("../storage/storage.js");

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

router.post("/form", upload.single("file"), (req, res) => {
  console.log(req.file, req.body);
  const { pinned } = req.body || null;
  if (pinned !== null && pinned !== undefined) {
    if (req.file) {
      const data = {
        ...req.body,
        pinned: req.body.pinned == true,
        image: req.file.filename
      }
      postBulletin(data, (response) => {
        res.statusCode = response.status;
        if (response.status != 200) {
          deleteFile(req.file.path);
        }
        res.send(response.body);
      });
    } else {
      res.statusCode = 400;
      res.send({error: "File not found"})
    }
  } else {
    res.statusCode = 400;
    res.send({error: "pinned missing"});
  }
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
  data.id = req.params.id;
  updateBulletin(data, (response) => {
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
  deleteBulletin(id, category, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
