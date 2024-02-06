let db = require("../../database/models");
const quoteService = require('../services/quoteService')
const indexController = {
  index: async function (req, res) {
    try {
      const recetas = await db.Recetas.findAll({
        where: {RecetaActiva:1},
        order:[["NombreReceta", "ASC"]],
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


      // Opciones para la query de Ultima Venta.
      const options={
        order:[["FechaVenta", "DESC"]],
        limit: 1
      };

      const { valorDolarblue, valorDolarOf, fechaActual } = await quoteService.data();
      const ultimaVenta = await db.Ventas.findAll(options);
      
      res.render("index", { recetas:recetas, ultimaVenta:ultimaVenta, valorDolarblue, valorDolarOf, fechaActual});

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
