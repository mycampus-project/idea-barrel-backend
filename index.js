const express = require('express');

const usersRoutes = require("./routes/users.js");
const eventsRoutes = require("./routes/events.js");
const ideasRoutes = require("./routes/ideas.js");
const bulletinsRoutes = require("./routes/bulletins.js");

const app = express();
const PORT = 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);
app.use("/ideas", ideasRoutes);
app.use("/bulletins", bulletinsRoutes);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
