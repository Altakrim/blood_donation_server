const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyVolunteer = require("../middlewares/verifyVolunteer");
const { donationsCollection } = require("../db");

const router = express.Router();

// Volunteer: get all donation requests
router.get(
  "/all",
  verifyJWT,
  verifyVolunteer,
  async (req, res) => {
    const result = await donationsCollection.find().toArray();
    res.send(result);
  }
);

// PUBLIC: Search donors
router.get("/donors", async (req, res) => {
  const { bloodGroup } = req.query;

  const query = {
    role: "donor",
    status: "active",
  };

  if (bloodGroup) {
    query.bloodGroup = bloodGroup;
  }

  const result = await usersCollection.find(query).toArray();
  res.send(result);
});


// PUBLIC: Get pending donation requests
router.get("/pending", async (req, res) => {
  const result = await donationsCollection
    .find({ status: "pending" })
    .toArray();

  res.send(result);
});


// // PUBLIC: Donation details
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await donationsCollection.findOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});

// PUBLIC test
router.get("/test", (req, res) => {
  res.send("Donations route working");
  
});
module.exports = router;
