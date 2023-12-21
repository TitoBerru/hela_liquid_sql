let db = require("../../database/models");
const salesCostServiceSql = require("../services/salesCostServiceSql");

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
              attributes: ["IDAroma", "CantidadAroma"],
            },
          },
        ],
      });
      
      // if (receta[0].hasOwnProperty("id")) {
      //   console.log('el atributo ID esta presente en el objeto', receta[0].id);
      // } else {
      //   console.log("El atributo 'ID' no está presente en el objeto.");
      // }
      // console.log(JSON.stringify(recetas, null, 2));
      // console.log(recetas[0].ID)
      const cmv = await salesCostServiceSql.consulta("Pepe", 58, 60, 9, 1, 5000);
      // Enviar los resultados al cliente en formato JSON
      // res.json(recetas[0].aromas[0].aroma_cantidad.CantidadAroma);
      // res.send(cmv)
     
      // console.log('data del req.body ', (JSON.stringify(recetas[0].ID)));
      res.render("index", { recetas, cmv });

      // res.send(recetas)
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener las recetas" });
    }
  },
};

module.exports = indexController;
