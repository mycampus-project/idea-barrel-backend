const express = require("express");

const router = express.Router();

const {
  getEvents,
  postEvent,
  deleteEvent,
  getEventById,
  updateEvent,
} = require("../db-access/events-db");

router.get("/", (req, res) => {
  getEvents((response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.post("/", (req, res) => {
  const event = req.body;
  postEvent(event, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getEventById(id, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

router.put("/:id", (req, res) => {
  // isAuthorized
  const data = req.body;
  data.id = req.params.id;
  updateEvent(data, (response) => {
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
  deleteEvent(id, category, (response) => {
    res.statusCode = response.status;
    res.send(response.body);
  });
});

module.exports = router;
