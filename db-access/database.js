require("dotenv").config();

const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("../config");

const helpers = require("./helper-functions");

const { statusMsg } = helpers;

const {
  endpoint,
  key,
  databaseId,
  // usersContainerId,
  // bulletinsContainerId,
  // eventsContainerId,
  // ideasContainerId,
} = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);

// const containerUsers = database.container(usersContainerId);
// const containerEvents = database.container(eventsContainerId);
// const containerIdeas = database.container(ideasContainerId);
// const containerBulletins = database.container(bulletinsContainerId);

const selectAll = {
  query: "SELECT * from c",
};

const containerById = (id) => {
  return database.container(id);
};

const getAll = async (containerId, cb) => {
  console.log(`Querying all data from container: ${containerId}`);
  try {
    const { resources: items } = await containerById(containerId)
      .items.query(selectAll)
      .fetchAll();
    cb(statusMsg(200, items));
  } catch (e) {
    cb(statusMsg(404, { errorMsg: e }));
  }
};

const getByQuery = async (containerId, query, cb) => {
  console.log(query);
  console.log(`Querying container: ${containerId}`);
  try {
    const { resources: items } = await containerById(containerId)
      .items.query(query)
      .fetchAll();
    // items.forEach((item) => {
    //   console.log(`${item.id} - ${item.email}`);
    // });
    cb(statusMsg(200, items));
  } catch (e) {
    cb(statusMsg(404, { errorMsg: e }));
  }
};

// TODO: ID validity check!!!!
const postToContainer = async (containerId, data, cb) => {
  try {
    const { resource: createdItem } = await containerById(
      containerId
    ).items.create(data);
    cb(statusMsg(200, createdItem));
  } catch (e) {
    cb(statusMsg(400, { errorMsg: e }));
  }
};

const updateById = async (containerId, newItem, cb) => {
  try {
    const { id, category } = newItem;
    const { resource: updatedItem } = await containerById(containerId)
      .item(id, category)
      .replace(newItem);
    cb(statusMsg(200, updatedItem));
  } catch (e) {
    cb(statusMsg(400, { errorMsg: e }));
  }
};

const deleteById = async (containerId, id, partition, cb) => {
  try {
    const { resource: result } = await containerById(containerId)
      .item(id, partition)
      .delete();
    cb(statusMsg(200, result));
  } catch (e) {
    cb(statusMsg(400, { errorMsg: e }));
  }
};

module.exports = {
  getAll,
  getByQuery,
  postToContainer,
  updateById,
  deleteById,
};
