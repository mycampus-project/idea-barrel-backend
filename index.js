import express from "express";

import usersRoutes from "./routes/users.js"
import eventsRoutes from "./routes/events.js"
import ideasRoutes from "./routes/ideas.js"
import bulletinsRoutes from "./routes/bulletins.js"

const app = express();
const PORT = 4200;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/events", eventsRoutes);
app.use("/ideas", ideasRoutes);
app.use("/bulletins", bulletinsRoutes);

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});