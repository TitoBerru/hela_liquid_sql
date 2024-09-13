let db = require("../../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const queryOptions = {where:{RecetaActiva : 1},order: [['NombreReceta','ASC']]}

const stockPorRecetaController = {
  
  index2: async function (req, res) {
    await db.Recetas.findAll(queryOptions)
    .then(function(receta){
      // res.send(receta)
      res.render("stockPorReceta", {recetas: receta});
    })
  },
  index: async function (req, res) {
   
      const recetas = await db.Recetas.findAll({
        where: { RecetaActiva: 1 },
        attributes: ["ID","NombreReceta", "TipoReceta", "Descripcion"],
        include: [
          {
            model: db.Aromas,
            as: "aromas",
            attributes: ["NombreAroma", "ID","CantidadDisponible"],
            through: {
              model: db.Recetaaromas,
              as: "aroma_cantidad", // Alias diferente
              attributes: ["CantidadAroma"],
            },
          },
        ],
        raw: true,
        nest: true,
      })
      // res.send(recetas)
      res.render("stockPorReceta", {recetas});
  },

  check: async function (req, res) {
    res.send (req.body)
  },
}

module.exports = stockPorRecetaController;
