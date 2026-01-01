const express = require("express");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { usersCollection } = require("../db");

const router = express.Router();

// get all users (protected)
router.get("/", verifyJWT, async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.send(users);
});

// Dashboard Stats
router.get("/stats", verifyJWT, verifyAdmin, async (req, res) => {
  const users = await usersCollection.countDocuments();
  const requests = await donationRequestCollection.countDocuments({status: "pending"});
  const done = await donationRequestCollection.countDocuments({status: "done"});

  res.send({users, requests, pending, done})
});

// save user (register)
router.post("/", async (req, res) => {
  const user = req.body;

  const existing = await usersCollection.findOne({ email: user.email });
  if (existing) {
    return res.send({ message: "User already exists" });
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
});

// jwt create
router.post("/jwt", (req, res) => {
  const user = req.body;

  if (!user?.email) {
    return res.status(400).send({ message: "Email required" });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.send({ token });
});

module.exports = router;
