const express = require('express');
const router = express.Router();
function combineDateAndTime(dateObj, timeString) {
  if (!dateObj || !timeString) return null;
  try {
    const [hours, minutes] = timeString.split(":").map(Number);
    const combined = new Date(dateObj);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  } catch (error) {
    console.error("Erreur lors de la combinaison date/heure:", error);
    return new Date(dateObj); 
  }
}


function getStatusColor(status) {
  switch (status) {
    case "Confirmé":
      return "#10b981"; // vert
    case "En attente":
      return "#f59e0b"; // orange
    case "Annulé":
      return "#ef4444"; // rouge
    default:
      return "#6b7280"; // gris
  }
}


exports.getRendezVous = async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = {};

    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end)
      };
    }
    
    const rendezVous = await RendezVous.find(query);
    console.log(`${rendezVous.length} rendez-vous trouvés`);

    const events = rendezVous.map((rdv) => {
      if (!rdv.date || !rdv.time) {
        console.warn(`Rendez-vous ${rdv._id} a des données de date/heure manquantes`);
        return null;
      }
      
      const startDateTime = combineDateAndTime(rdv.date, rdv.time);
      if (!startDateTime) return null; 
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1);

      return {
        id: rdv._id,
        title: `RDV - ${rdv.location || 'Sans lieu'} - ${rdv.prix || 0}€`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        extendedProps: {
          status: rdv.status || 'En attente',
          location: rdv.location || 'Sans lieu',
          prix: rdv.prix || 0,
        },
        backgroundColor: getStatusColor(rdv.status),
        borderColor: getStatusColor(rdv.status),
      };
    }).filter(event => event !== null); 

    res.status(200).json(events);
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    res.status(500).json({ 
      message: "Erreur lors de la récupération des rendez-vous",
      error: error.message 
    });
  }
}
module.exports = router;