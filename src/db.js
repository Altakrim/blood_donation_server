const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection;

const connectDB = async () => {
  await client.connect();
  const db = client.db("bloodDonationDB");
  usersCollection = db.collection("users");
  console.log("MongoDB Connected");
};

module.exports = { connectDB, usersCollection };
