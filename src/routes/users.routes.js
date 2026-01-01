const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyVolunteer = require("../middlewares/verifyVolunteer");
const { usersCollection } = require("../db"); // adjust path if needed

const router = express.Router();

/* =========================
   GET: All users (Admin use)
========================= */
router.get("/", verifyJWT, async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.send(users);
});

/* =========================
   GET: Logged-in user profile
========================= */
router.get("/me", verifyJWT, async (req, res) => {
  const email = req.decoded.email;

  const user = await usersCollection.findOne({ email });
  res.send(user);
});

/* =========================
   PATCH: Update profile
========================= */
router.patch("/me", verifyJWT, async (req, res) => {
  const email = req.decoded.email;
  const updatedInfo = req.body;

  const result = await usersCollection.updateOne(
    { email },
    { $set: updatedInfo }
  );

  res.send(result);
});

// Volunteer: update donation status only
router.patch(
  "/status/:id",
  verifyJWT,
  verifyVolunteer,
  async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const result = await donationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    res.send(result);
  }
);


/* =========================
   TEST: Profile route
========================= */
router.get("/profile", verifyJWT, async (req, res) => {
  res.send({
    message: "User profile data",
    email: req.decoded.email,
  });
});

module.exports = router;
