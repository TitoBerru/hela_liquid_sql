const { json } = require("sequelize");
let db = require("../../../database/models");

const apisSalesController = {
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
  },
  salesLast: async function (req, res) {
    try {
      const ventas = await db.Ventas.findAll({
        where: {
          VentaEfectiva: 1,
        },
        limit: 1,
        order: [['id','DESC']]
        
      });
      res.json(ventas);
    } catch (error) {
      res.status(500).json("Error al consultar Ultima venta - Error: ", error);
    }
  },

}



module.exports = apisSalesController;