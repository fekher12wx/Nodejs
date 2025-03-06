const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const psychologueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true }, 
});
psychologueSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});
psychologueSchema.methods.comparePassword = async function (userPassword) {
  return bcryptjs.compare(userPassword, this.password);
};

module.exports = mongoose.model("psychologue", psychologueSchema);
