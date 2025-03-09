const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user.route");
const AuthRoutes = require("./routes/auth.routes");
const rendezVousRoutes = require("./routes/Rendezvous.route");
const psychologueRoutes = require("./routes/psychologue.routes");
const EmailService = require("./mailing/EmailService");

// Initialisation correcte d'EmailService
const emailService = new EmailService({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/psychologue", psychologueRoutes);
app.use("/auth", AuthRoutes);
app.use("/rendezVous", rendezVousRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to server database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
