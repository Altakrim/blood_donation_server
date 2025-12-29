const express = require('express');
const cors = require('cors');
const usersRoutes = require("./routes/users.routes");
const userAdmin = require('./routes/admin.routes');
const volunteerRoutes = require('./routes/volunteer.routes');
const app = express();


// middleware
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes)
app.use('/admin', userAdmin);
app.use('/volunteer', volunteerRoutes);


app.get('/', (req, res) => {
  res.send('Blood Donation Server is running');
});



module.exports = app;
