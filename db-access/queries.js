const selectByCategory = (category) => {
  return query(`SELECT * from c where c.category=${category}`);
};

const userQueries = () => {
  const selectByEmail = (email) => {
    return query(`SELECT * from c where c.email=${email}`);
  };

  const selectById = (id) => {
    return query(`SELECT * from c where c.id=${id}`);
  };
};

const eventQueries = () => {};

const ideaQueries = () => {};

const bulletinQueries = () => {};

// Turn string into query object to eliminate most repetition
const query = (queryStr) => {
  return { query: queryStr };
};
