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



