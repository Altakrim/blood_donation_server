const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const adminRoute = require("./routes/admin.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const donationsRoutes = require("./routes/donation.routes");
const fundingRoutes = require("./routes/funding.routes.js");

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://stalwart-cupcake-aac346.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/admin", adminRoute);
app.use("/volunteer", volunteerRoutes);
app.use("/donations", donationsRoutes);
app.use("/funding", fundingRoutes);

app.get("/", (req, res) => {
  res.send("Blood Donation Server is running");
});

module.exports = app;
