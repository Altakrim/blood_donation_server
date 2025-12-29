require("dotenv").config();
// const { MongoClient, ServerApiVersion } = require("mongodb");
const app = require("./app");
const { connectDB } = require("./db");
// const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });


// // MongoDB URI
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });



// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("bloodDonationDB");
//     const userCollection = database.collection("users");

//     // Post user data (Register Save)
//     app.get("/users", verifyJWT, async (req, res) => {
//       const users = await usersCollection.find().toArray();
//       res.send(users);
//     });
//         // Secure Route 
//     app.post("/users", async (req, res) => {
//       const user = req.body;

//       const existingUser = await userCollection.findOne({ email: user.email });
//       if (existingUser) {
//         return res.send({ message: "User already exists" });
//       }

//       const result = await userCollection.insertOne(user);
//       res.send(result);
//     });

//     app.post("/jwt", (req, res) => {
//       const user = req.body; // {email}

//       if (!user?.email) {
//         return res.status(400).send({ message: "email required" });
//       }

//       const token = jwt.sign(user, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//       });
      
//       res.send({ token });
//     });

//     console.log("Connected to MongoDB Successfully");
//   } finally {
//     // keep connection open
//   }
// }

// run().catch(console.dir);

// //  Server listen
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
