const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user.route");
const AuthRoutes =require('./routes/auth.routes');
const Rendezvous=require('./routes/Rendezvous.route');

app.use(express.json());
app.use("/users", userRoutes);
 
app.use('/auth',AuthRoutes);
app.use('/rendezvous',Rendezvous);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to server database");
  })
  .catch((err) => {
    console.log("error connecting to database");
  });

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("listening on port" + port);
});
