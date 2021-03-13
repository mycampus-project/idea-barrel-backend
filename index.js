const CosmosClient = require("@azure/cosmos").CosmosClient;

const config = require("./config");

require("dotenv").config();

console.log(process.env.DB_ACCESS_KEY);

const {
  endpoint,
  key,
  databaseId,
  usersContainerId,
  bulletinsContainerId,
  eventsContainerId,
  ideasContainerId,
} = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);

const containerUsers = database.container(usersContainerId);
const containerEvents = database.container(eventsContainerId);
const containerIdeas = database.container(ideasContainerId);
const containerBulletins = database.container(bulletinsContainerId);

// TODO: move querys to own module

const querySelectAll = {
  query: "SELECT * from c",
};

const querySelectByEmail = (email) => {
  return {
    query: `SELECT * from c where c.email=${email}`,
  };
};

const querySelectById = (id) => {
  return {
    query: `SELECT * from c where c.email=${id}`,
  };
};

const querySelectByCategory = (category) => {
  return {
    query: `SELECT * from c where c.category=${category}`,
  };
};

const fetchContainerData = async (container, query, cb) => {
  console.log(query);
  console.log(`Querying container: Users`);
  try {
    const { resources: items } = await container.items.query(query).fetchAll();
    // items.forEach((item) => {
    //   console.log(`${item.id} - ${item.email}`);
    // });
    cb(statusMsg(200, items));
  } catch (e) {
    cb(statusMsg(404, { errorMsg: e }));
  }
};

const deleteById = async (container, id, partition, cb) => {
  if (id) {
    try {
      const { resource: result } = await container.item(id, partition).delete();
      cb(statusMsg(200, result));
    } catch (e) {
      cb(statusMsg(400, { errorMsg: e }));
    }
  } else {
    cb(statusMsg(400, "id not provided"));
  }
};

const statusMsg = (status, data) => {
  return {
    status,
    data,
  };
};

getUsers((res) => {
  console.log(res);
});
