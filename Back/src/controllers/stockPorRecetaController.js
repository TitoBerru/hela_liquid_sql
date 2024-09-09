let db = require("../../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const stockPorRecetaController = {
  
  query: function (req, res) {
    // res.render("./Sales/salesForFlavor");
    res.send('Lego por stock por receta controller query');
  },

  createSale: async function (req, res) {
    const options = {
      order: [["FechaVenta", "DESC"]],
      limit: 1,
    };
    await db.Ventas.findAll(options).then(function (ventas) {
      res.send(ventas);
    });
  },
};

module.exports = stockPorRecetaController;
