const express = require('express');
const router = express.Router();
const Psychologue = require('../models/psychologue'); 
router.post('/', async (req, res) => {
    try {
        const psychologue = new Psychologue(req.body);
        await psychologue.save();
        res.status(201).send({ message: "Psychologue enregistré avec succès", psychologue });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de l'enregistrement", error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const psychologues = await Psychologue.find();
        res.status(200).send(psychologues);
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la récupération des psychologues", error });
    }
});

router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const psychologue = await Psychologue.findOne({ email });
        if (!psychologue) {
            return res.status(404).send({ message: "Psychologue non trouvé" });
        }
        res.send({ psychologue });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la récupération du psychologue", error });
    }
});

router.put('/update/:email', async (req, res) => {
    try {
        const updatedPsychologue = await Psychologue.findOneAndUpdate(
            { email: req.params.email },
            { $set: req.body }, // Met à jour avec les données envoyées dans la requête
            { new: true } // Retourne le document mis à jour
        );

        if (!updatedPsychologue) {
            return res.status(404).send({ message: "Psychologue non trouvé" });
        }

        res.send({ message: "Psychologue mis à jour avec succès", updatedPsychologue });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la mise à jour du psychologue", error });
    }
});

router.delete('/:email', async (req, res) => {
    try {
        const deletedPsychologue = await Psychologue.findOneAndDelete({ email: req.params.email });

        if (!deletedPsychologue) {
            return res.status(404).send({ message: "Psychologue non trouvé" });
        }

        res.send({ message: "Psychologue supprimé avec succès" });
    } catch (error) {
        res.status(500).send({ message: "Erreur lors de la suppression du psychologue", error });
    }
});

module.exports = router;
