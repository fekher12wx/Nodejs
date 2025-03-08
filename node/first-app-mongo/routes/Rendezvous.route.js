const express = require('express');
const router = express.Router();
const Rendezvous = require('../models/Rendezvous.js');


router.post('/', async (req, res) => {
    try {
      const rendezvous = new Rendezvous(req.body);
      const test = await Rendezvous.findOne({
        professional: req.body.professional,
        date: new Date(req.body.date),
        startTime: req.body.startTime,
        status: 'scheduled'
      });
      
      if (test) {
        return res.status(400).send({ message: "ne pas disponible" });
      }
      
      await rendezvous.save();
      res.status(201).send({ message: "rendezvous saved successfully", rendezvous });
    } catch (error) {
      res.status(500).send({ message: "error saving rendezvous", error });
    }
  });

  router.get('/client/:email', async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const rendezvous = await Rendezvous.find({ client: clientId })
        .populate('client', 'name email')
        .populate({
          path: 'professional',
          populate: {
            path: 'user',
            select: 'name email'
          }
        })
        .sort({ date: 1, startTime: 1 });
      
      res.status(200).send(rendezvous);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const rendezvous = await Rendezvous.findById(req.params.id);
      if (!rendezvous) {
        return res.status(404).send({ message: "rendezvous not found" });
      }
      
      await Rendezvous.findByIdAndDelete(req.params.id);
      res.send({ message: "rendezvous deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "error deleting rendezvous", error });
    }
  });
  router.put("/cancel/:id", async (req, res) => {
    try {
      const rendezvous = await Rendezvous.findById(req.params.id);
      if (!rendezvous) {
        return res.status(404).send({ message: "rendezvous not found" });
      }
      
      if (rendezvous.status === 'cancelled') {
        return res.status(400).send({ message: "rendezvous is already cancelled" });
      }
      
      const updatedRendezvous = await Rendezvous.findByIdAndUpdate(
        req.params.id,
        { $set: { status: 'cancelled' } },
        { new: true }
      )
        .populate('client', 'name email')
        .populate({
          path: 'professional',
          populate: {
            path: 'user',
            select: 'name email'
          }
        });
      
      res.send({ message: "rendezvous cancelled successfully", rendezvous: updatedRendezvous });
    } catch (error) {
      res.status(500).send({ message: "error cancelling rendezvous", error });
    }
  });
  module.exports = router;