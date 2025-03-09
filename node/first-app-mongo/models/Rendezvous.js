const mongoose = require("mongoose");
 
 const rendezVousSchema = new mongoose.Schema({
   date: { type: Date, required: true },
   time: { type: String, required: true },
   status: { type: String, enum: ["En attente", "Confirmé", "Annulé"], default: "En attente" },
   location: { type: String, required: true }, 
   prix: { type: Number, required: true },
 });
 
 module.exports = mongoose.model("RendezVous", rendezVousSchema);