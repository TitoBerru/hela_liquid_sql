const { json } = require("sequelize");
let db = require("../../../database/models");

const apiNewSaleController = {
  sales: async function (req, res) {
    try {
      const ventas = await db.Ventas.findAll({
        where: {
          VentaEfectiva: 1,
        },
      });
      res.json(ventas);
    } catch (error) {
      res.status(500).json("Error al consultar ventas Totales- Error: ", error);
    }
  }
}
module.exports = apiNewSaleController;