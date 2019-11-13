const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

// Add new user
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(created => {
      const token = generateToken(created);
      res.status(201).json({ user: created, token });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Log in as user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Fetch users
router.get("/users", restricted, (req, res) => {
  const { username, department } = req.decodedToken;
  if (department === "management") {
    Users.find()
      .then(users => {
        res.json({ user: username, department, users });
      })
      .catch(err => res.status(500).send(err));
  } else {
    Users.findBy({ department })
      .then(users => {
        res.json({ user: username, department, users });
      })
      .catch(err => res.status(500).send(err));
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1d"
  };
  // eslint-disable-next-line no-undef
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
