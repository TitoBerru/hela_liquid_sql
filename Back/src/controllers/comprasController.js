const db = require("../../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const mesEnCurso = new Date().getMonth()+1;
 // Establece el día al primero del mes
 const fechaInicioMes = new Date().getDate();
// fechaInicioMes.setDate(1)
const queryComprasMes ={
 
  where: {
    FechaPago: {
      [Op.gte]: fechaInicioMes,
    },
  },
}
const queryComprasOptions = {
  attributes: [
    [Sequelize.fn("YEAR", Sequelize.col("FechaPago")), "anio"],
    [Sequelize.fn("MONTH", Sequelize.col("FechaPago")), "mes"],
    [Sequelize.fn("SUM", Sequelize.col("Monto")), "totalMontoCompras"],
  ],
  group: [Sequelize.fn("MONTH", Sequelize.col("FechaPago"))],
  order:[['FechaPago','DESC' ]],
  raw: true,
};
const queryVentasOptions = {
  where: { VentaEfectiva: 1 },
  attributes: [
    [Sequelize.fn("YEAR", Sequelize.col("FechaVenta")), "anio"],
    [Sequelize.fn("MONTH", Sequelize.col("FechaVenta")), "mes"],
    [Sequelize.fn("SUM", Sequelize.col("PrecioVenta")), "totalMontoVentas"],
  ],
  group: [Sequelize.fn("MONTH", Sequelize.col("FechaVenta"))],
  raw: true,
};

const comprasController = {
  list: async function (req, res) {
    const compras = await db.Compras.findAll(queryComprasOptions);
    const ventas = await db.Ventas.findAll(queryVentasOptions);

    const resultado = [];

    // Recorre el objeto compras
    for (const compra of compras) {
      // Busca el elemento correspondiente en ventas
      const elementoB = ventas.find(
        (venta) => venta.anio === compra.anio && venta.mes === compra.mes
      );

      // Si se encuentra un elemento en ventas que coincide, combina la información
      if (elementoB) {
        const nuevoObjeto = {
          anio: compra.anio,
          mes: compra.mes,
          totalMontoCompras: compra.totalMontoCompras,
          totalMontoVentas: elementoB.totalMontoVentas,
        };

        resultado.push(nuevoObjeto);
      }
    }

    // console.log('✅ Console Log linea 50 Compras Controller: ', resultado);

    // res.send(resultado);
    // console.log('✅linea 53 compras controller',resultado)
    res.render('compras', { resultado });
  },
  comprasMes: async function(req,res){
    console.log('🟢 linea 68 compras Controller',fechaInicioMes)
    const compras = await db.Compras.findAll({queryComprasMes});
    res.send(compras)
  },

  registroCompra: async function (req, res) {
    await db.Compras.create({
      Monto: req.body.costo,
      FechaPago: new Date(),
      MetodoPago: req.body.metodoPago.toUpperCase(),
      TipoProducto: req.body.tipoProducto.toUpperCase(),
      Cantidad: req.body.cantidad,
      Unitario: req.body.mlOUnitario,
      Proveedor: req.body.proveedor.toUpperCase(),
      Comentarios: req.body.comentarios.toUpperCase(),
    });
    // res.send(req.body);
    res.redirect('/compras')
  },
};

module.exports = comprasController;
