
const express = require("express");
const { ObjectId } = require("mongodb");
const { donationsCollection, usersCollection } = require("../db");

const verifyJWT = require("../middlewares/verifyJWT");
const verifyVolunteer = require("../middlewares/verifyVolunteer");

const router = express.Router();

//  Volunteer: get all donation requests
router.get("/all", verifyJWT, verifyVolunteer, async (req, res) => {
  const result = await donationsCollection.find().toArray();
  res.send(result);
});

// PUBLIC: Search donors
router.get("/donors", async (req, res) => {
  const { bloodGroup, district, upazila } = req.query;

  const query = {
    role: "donor",
    status: "active",
  };

  if (bloodGroup) query.bloodGroup = bloodGroup;
  if (district) query.district = district;
  if (upazila) query.upazila = upazila;

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

// PUBLIC: Donation details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  const result = await donationsCollection.findOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});

//  TEST
router.get("/test", (req, res) => {
  res.send("Donations route working");
});

//  PRIVATE: Accept donation request
router.patch("/accept/:id", verifyJWT, async (req, res) => {
  const { id } = req.params;
  const { donorName, donorEmail } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  const updateDoc = {
    $set: {
      status: "inprogress",
      donorName,
      donorEmail,
    },
  };

  const result = await donationsCollection.updateOne(
    { _id: new ObjectId(id) },
    updateDoc
  );

  res.send(result);
});


module.exports = router;
