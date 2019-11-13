const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "francis",
          password: bcrypt.hashSync("obiwan", 8),
          department: "management"
        },
        {
          username: "toby",
          password: bcrypt.hashSync("obiwan", 8),
          department: "management"
        },
        {
          username: "dom",
          password: bcrypt.hashSync("obiwan", 8),
          department: "sales"
        },
        {
          username: "amira",
          password: bcrypt.hashSync("obiwan", 8),
          department: "sales"
        },
        {
          username: "martins",
          password: bcrypt.hashSync("obiwan", 8),
          department: "sales"
        },
        {
          username: "dammy",
          password: bcrypt.hashSync("obiwan", 8),
          department: "sales"
        }
      ]);
    });
};
