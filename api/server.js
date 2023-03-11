// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");
const server = express();

//Global middleware
server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await model.find();
    res.status(200).json({ message: "Success fetching users", data: allUsers });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
