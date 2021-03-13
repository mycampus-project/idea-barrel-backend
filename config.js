// https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started
require("dotenv").config();

const config = {
    endpoint: process.env.DB_URL,
    key: process.env.DB_ACCESS_KEY,
    databaseId: "idea-barrel",
    usersContainerId: "users",
    eventsContainerId: "events",
    ideasContainerId: "ideas",
    bulletinsContainerId: "bulletins",
  };
  
  module.exports = config;