// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");
const server = express();

//Global middleware
server.use(express.json());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(422).json({
        message: "Name and Bio is needed to create user",
      });
    } else {
      const createUser = await model.insert({ name, bio });
      res.status(201).json({
        message: "Success creating new user",
        data: createUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error creating new user: ${err.message}`,
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await model.find();
    res.status(200).json({ message: "Success fetching users", data: allUsers });
  } catch (err) {
    res.status(500).json({
      message: `Error fetching users: ${err.message}`,
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await model.findById(id);
    if (!getUser) {
      res.status(404).json({
        message: `User cannot be found with id of ${id}`,
      });
    } else {
      res.status(200).json(getUser);
    }
  } catch (err) {
    res.status(500).json({
      message: `Error fetching user: ${err.message}`,
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
