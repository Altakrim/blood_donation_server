// const {usersCollection} = require("../server");

// const verifyAdmin = async (req, res, next) => {
//   const email = req.decoded.email;

//   const user = await usersCollection.findOne({ email });

//   if (user?.role !== "admin") {
//     return res.status(403).send({ message: "Forbidden access" });
//   }

//   next();
// };

// // module.exports = verifyAdmin;

const { usersCollection } = require("../db");

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded?.email;

    if (!email) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    const user = await usersCollection.findOne({ email });

    if (user?.role !== "admin") {
      return res.status(403).send({ message: "Forbidden: Admin only" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = verifyAdmin;

