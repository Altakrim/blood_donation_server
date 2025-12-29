const {usersCollection} = require("../server");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;

  const user = await usersCollection.findOne({ email });

  if (user?.role !== "admin") {
    return res.status(403).send({ message: "Forbidden access" });
  }

  next();
};

module.exports = verifyAdmin;
