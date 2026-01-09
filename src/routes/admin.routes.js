const express = require("express");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { usersCollection, donationsCollection } = require("../db");

const router = express.Router();

// Get all users (admin only better)
router.get("/", verifyJWT, verifyAdmin, async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.send(users);
});

// Dashboard Stats (admin)
router.get("/stats", verifyJWT, verifyAdmin, async (req, res) => {
  const users = await usersCollection.countDocuments();
  const pending = await donationsCollection.countDocuments({ status: "pending" });
  const done = await donationsCollection.countDocuments({ status: "done" });

  res.send({ users, pending, done });
});

// Save user (register)
router.post("/", async (req, res) => {
  const user = req.body;

  const existing = await usersCollection.findOne({ email: user.email });
  if (existing) {
    return res.send({ message: "User already exists" });
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
});

// JWT create
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

// / Change user role
router.patch("/role/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).send({ message: "Role is required" });
  }

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { role } }
  );

  res.send({ message: "Role updated", result });
});


module.exports = router;
