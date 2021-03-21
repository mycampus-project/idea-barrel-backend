require("dotenv").config();

const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("../config");
const helpers = require("./helper-functions");

const { statusMsg } = helpers;

const {
  endpoint,
  key,
  databaseId,
} = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);

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
    cb(statusMsg(200, items));
  } catch (e) {
    cb(statusMsg(404, { errorMsg: e }));
  }
};

// TODO: ID validity check!!!!
const postToContainer = async (containerId, data, cb) => {
  const date = new Date().toISOString();
  const dataWithDate = {...data, date}
  try {
    const { resource: createdItem } = await containerById(
      containerId
    ).items.create(dataWithDate);
    cb(statusMsg(200, createdItem));
  } catch (e) {
    cb(statusMsg(400, { errorMsg: e }));
  }
};

// Update a post. Needs to know the id of the post, 
// and its category (old if changed) value as its arguments.
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

// Deletes an item by id. In addition to the id argument, requires another
// argument: "partitionValue" that is used as a partition key in Cosmos DB.
const deleteById = async (containerId, id, partitionValue, cb) => {
  try {
    const { resource: result } = await containerById(containerId)
      .item(id, partitionValue)
      .delete();
    cb(statusMsg(200, {msg: "deleted", result: result}));
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
