const express = require("express");
const cors = require("cors")

require("dotenv").config();

const uploads = require("./routes/image.js");
const usersRoutes = require("./routes/users.js");
const eventsRoutes = require("./routes/events.js");
const ideasRoutes = require("./routes/ideas.js");
const bulletinsRoutes = require("./routes/bulletins.js");

const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const devApiKey = process.env.DEV_API_KEY;

// Static files before authentication check... TODO: fix
app.use("/image", express.static(__dirname + "/uploads/"));

app.get("*", (req, res, next) => {
  // Ghetto authentication
  const token = req.headers.dev_token;
  //console.log(token);
  if (token == devApiKey) {
    return next();
  } else {
    res.sendStatus(404);
  }
});

app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);
app.use("/ideas", ideasRoutes);
app.use("/bulletins", bulletinsRoutes);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
