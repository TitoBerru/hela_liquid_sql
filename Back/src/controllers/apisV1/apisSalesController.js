const { json, fn, col, literal } = require("sequelize");
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
  salesProspect: async function (req, res) {
    try {
      const ventas = await db.Ventas.findAll({
        where: {
          VentaEfectiva: 0,
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
    const customerFind = await db.Clientes.findByPk(req.body.cliente)
try {
    let idCliente = customerFind.id;
    let cliente = customerFind.Nombre.toUpperCase(); ;  // oJO QUE AHORA ENVIO EL ID
    let idReceta=req.body.receta; 
    let ml=req.body.mililitros;
    let nico=req.body.nico;
    let cant=req.body.unidades;
    let pcioVenta=req.body.precioVenta;
    let VentaEfectiva = req.body.tipo;

    await salesCostService.consulta(idCliente,cliente,idReceta,ml,nico, cant, pcioVenta, VentaEfectiva);
  
} catch (error) {
  console.error("Error en el endpoint:", error);
  res.status(500).json({ status: "error", message: "Ocurrió un error en el servidor" });
}
res.status(200).json('OK');
    
  },
  year: async function (req, res) {
    try {
      const ventasPorMes = await db.Ventas.findAll({
        attributes: [
          [fn('YEAR', col('FechaVenta')), 'Año'], // Extraer el año
          [fn('MONTH', col('FechaVenta')), 'Mes'], // Extraer el mes
          [fn('SUM', col('CostoTotal')), 'CostoMes'], // Sumar el CostoTotal
          [fn('SUM', col('PrecioVenta')), 'VentasMes'], // Sumar el PrecioVenta
          [fn('SUM', col('Ganancia')), 'GananciaMes'], // Sumar la Ganancia
          [fn('COUNT', '*'), 'TotalVentas'] // Contar las ventas
        ],
        where: {
          VentaEfectiva: 1 // Filtrar solo por ventas efectivas
        },
        group: [literal('Año'), literal('Mes')], // Agrupar por año y mes
        order: [
          [literal('Año'), 'ASC'],
          [literal('Mes'), 'ASC']
        ]
      });
      res.status(200).json(ventasPorMes);
 
    } catch (error) {
      console.error("Error en el endpoint:", error);
      res.status(500).json({ status: "error", message: "Ocurrió un error en el servidor" });
    }
    
  }

}



module.exports = apisSalesController;