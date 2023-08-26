let db = require("../../database/models");

const indexController = {
    index: async function (req, res) {
      try {
        const recetas = await db.Recetas.findAll({
          attributes: ["ID", "NombreReceta"],
          include: [
            {
              model: db.Aromas,
              as: "aromas",
              attributes: ["NombreAroma"],
              through: {
                model: db.Recetaaromas,
                as: "aroma_cantidad", // Alias diferente ya que el otro generaba conflicto
                attributes: ["IDAroma","CantidadAroma"]
              }
            }
          ]
        });
  
        // Enviar los resultados al cliente en formato JSON
        // res.json(recetas[0].aromas[0].aroma_cantidad.CantidadAroma);
        // res.json(recetas)
        res.render('index', { recetas });
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener las recetas' });
      }
    }
  };
  

module.exports = indexController;
