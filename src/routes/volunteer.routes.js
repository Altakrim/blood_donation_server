// const { usersCollection } = require("../db");

// const verifyVolunteer = async (req, res, next) => {
//   const email = req.decoded.email;

//   const user = await usersCollection.findOne({ email });

//   if (!user || user.role !== "volunteer") {
//     return res.status(403).send({ message: "Forbidden access" });
//   }

//   next();
// };

// module.exports = verifyVolunteer;


const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyVolunteer = require("../middlewares/verifyVolunteer");
const { donationsCollection } = require("../db");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/requests", verifyJWT, verifyVolunteer, async (req, res) => {
  const data = await donationsCollection.find().toArray();
  res.send(data);
});

router.patch("/status/:id", verifyJWT, verifyVolunteer, async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  const result = await donationsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  res.send(result);
});

module.exports = router;

