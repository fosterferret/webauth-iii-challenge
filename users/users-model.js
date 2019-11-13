const db = require("../data/db-config");

async function add(user) {
  let ids = await db("users").insert(user, "id");
  return findById(ids[0]);
}

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findById,
  findBy
};
