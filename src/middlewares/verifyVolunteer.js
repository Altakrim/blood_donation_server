const { usersCollection } = require("../server");

const verifyVolunteer = async (req, res, next) => {
  const email = req.decoded.email;

  const user = await usersCollection.findOne({ email });

  if (user?.role !== "volunteer") {
    return res.status(403).send({ message: "Forbidden access" });
  }

  next();
};

module.exports = verifyVolunteer;
