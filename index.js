const express = require("express");
const cors = require('cors')

require("dotenv").config();

const usersRoutes = require("./routes/users.js");
const eventsRoutes = require("./routes/events.js");
const ideasRoutes = require("./routes/ideas.js");
const bulletinsRoutes = require("./routes/bulletins.js");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const devApiKey = process.env.DEV_API_KEY;

app.get("*", (req, res, next) => {
  // Ghetto authentication
  const token = req.headers.dev_token;
  console.log(token);
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
