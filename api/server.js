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
      res.status(400).json({
        message: "Please provide name and bio for the user",
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
      message: "There was an error while saving the user to the database",
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

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await model.remove(id);
    if (!deleteUser) {
      res.status(404).json({ message: `cannot find user ${id} to delete` });
    } else {
      res.json({
        message: "user deleted",
        data: deleteUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error deleting user: ${err.message}`,
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name } = req.body;
  try {
    const updateUser = await model.update(id, { bio, name });
    if (!bio || !name) {
      res.status(404).json({
        message: "Submission does not fulfill the requirements",
      });
    } else {
      res.status(200).json({
        message: "User update successful",
        data: updateUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error updating user: ${err.message}`,
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
