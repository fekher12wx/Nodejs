const express = require('express');
 const router = express.Router();
 const RendezVous = require('./models/rendezVous');
 router.post('/', async (req, res) => {
     try {
         const rendezVous = new RendezVous(req.body);
         await rendezVous.save();
         res.status(201).send({ message: "Rendez-vous enregistré avec succès", rendezVous });
     } catch (error) {
         res.status(500).send({ message: "Erreur lors de l'enregistrement du rendez-vous", error });
     }
 });
 router.get('/all', async (req, res) => {
     try {
         const rendezVous = await RendezVous.find();
         res.status(200).send(rendezVous);
     } catch (error) {
         res.status(500).send({ message: "Erreur lors de la récupération des rendez-vous", error });
     }
 });
 
 
 router.get('/:id', async (req, res) => {
     try {
         const rendezVous = await RendezVous.findById(req.params.id);
         if (!rendezVous) {
             return res.status(404).send({ message: "Rendez-vous non trouvé" });
         }
         res.send({ rendezVous });
     } catch (error) {
         res.status(500).send({ message: "Erreur lors de la récupération du rendez-vous", error });
     }
 });
 
 router.put('/update/:id', async (req, res) => {
     try {
         const updatedRendezVous = await RendezVous.findByIdAndUpdate(
             req.params.id,
             { $set: req.body },
             { new: true }
         );
 
         if (!updatedRendezVous) {
             return res.status(404).send({ message: "Rendez-vous non trouvé" });
         }
 
         res.send({ message: "Rendez-vous mis à jour avec succès", updatedRendezVous });
     } catch (error) {
         res.status(500).send({ message: "Erreur lors de la mise à jour du rendez-vous", error });
     }
 });
 
 router.delete('/:id', async (req, res) => {
     try {
         const deletedRendezVous = await RendezVous.findByIdAndDelete(req.params.id);
 
         if (!deletedRendezVous) {
             return res.status(404).send({ message: "Rendez-vous non trouvé" });
         }
 
         res.send({ message: "Rendez-vous supprimé avec succès" });
     } catch (error) {
         res.status(500).send({ message: "Erreur lors de la suppression du rendez-vous", error });
     }
 });
 
 module.exports = router;