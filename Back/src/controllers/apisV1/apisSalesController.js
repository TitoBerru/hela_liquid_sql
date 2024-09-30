const { json } = require("sequelize");
let db = require("../../../database/models");
const salesCostService = require ("../../services/salesCostServiceSql")

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
  newSale: async function (req, res) {
try {
  let cliente = req.body.cliente.toUpperCase(); 
    let idReceta=req.body.receta;
    let ml=req.body.ml;
    let nico=req.body.nico;
    let cant=req.body.cant;
    let pcioVenta=req.body.pcioVenta;
    let VentaEfectiva = req.body.ventaEfectiva;

    await salesCostService.consulta(cliente,idReceta,ml,nico, cant, pcioVenta, VentaEfectiva);
  
} catch (error) {
  console.error("Error en el endpoint:", error);
  res.status(500).json({ status: "error", message: "Ocurrió un error en el servidor" });
}
res.status(200).json('OK');
    
  }

}



module.exports = apisSalesController;