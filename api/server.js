// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");
const cors = require("cors");
const server = express();

//Global middleware
server.use(express.json());
server.use(cors());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      const createUser = await model.insert({ name, bio });
      res.status(201).json(createUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the user to the database",
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await model.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await model.findById(id);
    if (!getUser) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(getUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
    });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await model.remove(id);
    if (!deleteUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(deleteUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name } = req.body;
  try {
    const updateUser = await model.update(id, { bio, name });
    if (!bio || !name) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      if (!updateUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.status(200).json(updateUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be modified",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
