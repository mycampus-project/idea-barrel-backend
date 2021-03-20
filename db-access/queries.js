// Some basic SQL- CRUD queries used in every db module.

const selectByCategory = (category) => {
  return query(
    `SELECT * from c where c.category = @category`,
    parameter("@category", category)
  );
};

const selectUserByEmail = (email) => {
  return query(
    `SELECT * from c where c.email = @email`,
    parameter("@email", email)
  );
};

const selectById = (id) => {
  return query(`SELECT * from c where c.id = @id`, parameter("@id", id));
};
const deleteById = (id) => {
  return query(`DELETE from c where c.id = @id`, parameter("@id", id));
};

// A query syntax Cosmos DB accepts. The parameters are for preventing SQL injection.
const query = (queryStr, params) => {
  return { query: queryStr, parameters: [params] };
};

const parameter = (name, value) => {
  return { name: name, value: value };
};

module.exports = {
  selectByCategory,
  selectUserByEmail,
  selectById,
  deleteById,
};
