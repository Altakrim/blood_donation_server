const { usersCollection } = require("../db");

const verifyVolunteer = async (req, res, next) => {
  try {
    const email = req.decoded?.email;

    if (!email) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const user = await usersCollection.findOne({ email });

    if (user?.role !== "volunteer") {
      return res.status(403).send({ message: "Forbidden access" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = verifyVolunteer;
