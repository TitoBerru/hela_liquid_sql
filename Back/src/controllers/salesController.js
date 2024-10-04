let db = require("../../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const salesController = {
  list: async function (req, res) {
    const ventas2 = await db.Ventas.findAll({
      where: { VentaEfectiva: 1 },
      limit: 10,
      order: [[Sequelize.literal("FechaVenta"), "DESC"]],
    });

    // Formatear la fecha en formato español
    const opcionesFormato = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const ventas = ventas2.map((venta) => {
      const fechaParseada = new Date(venta.FechaVenta);
      const fechaFormateada = fechaParseada.toLocaleString(
        "es-AR",
        opcionesFormato
      );
      return {
        NombreCliente: venta.NombreCliente,
        FechaVenta: fechaFormateada,
        NombreReceta: venta.NombreReceta,
        PrecioVenta: venta.PrecioVenta,
        Ganancia: venta.Ganancia,
      };
    });
    res.render("sales", { ventas });
  },

  customer: async function (req, res) {
    const ventas = await db.Ventas.findAll({
      where: { VentaEfectiva: 1 },
      attributes: [
        ["NombreCliente", "cliente"],
        [
          Sequelize.fn("count", Sequelize.literal("VentaEfectiva")),
          "CantidadDeVentasReales",
        ],
        [
          Sequelize.fn("sum", Sequelize.literal("PrecioVenta")),
          "TotalFacturado",
        ],
        [Sequelize.fn("sum", Sequelize.literal("Ganancia")), "TotalGanancia"],
        [Sequelize.fn("sum", Sequelize.literal("CostoTotal")), "CostoTotal"],
      ],
      group: ["NombreCliente"],
      order: [[Sequelize.literal("NombreCliente"), "ASC"]],
    });
    // res.send(ventas)
    res.render("./Sales/salesForCustomer", { ventas: ventas });
  },

  customerSalesSearch: async function (req, res) {
    const customersFound1 = await db.Ventas.findAll({
      where: {
        NombreCliente: {
          [Op.like]: `%${req.query.searchCustomer}%`,
        },
      },
      order: [[Sequelize.literal("NombreCliente"), "ASC"]],
    });

    var hash = {};
    customersFound = customersFound1.filter(function (current) {
      var exists = !hash[current.NombreCliente];
      hash[current.NombreCliente] = true;
      return exists;
    });

    res.render("./Sales/salesForCustomerResults", {
      customersFound: customersFound,
    });
  },

  salesForCustomerDetail: async function (req, res) {
    const customerFound = await db.Ventas.findAll({
      where: { NombreCliente: req.params.id, VentaEfectiva: 1 },
      order: [[Sequelize.literal("FechaVenta"), "DESC"]],
    });
    const datosCliente = {
      nombreCliente: req.params.id,
      cantidadFrascos: 0,
      recetasMasCompradas: {},
      totalEnPesosVendido: 0,
      totalGanancia: 0,
      fechaUltimaVenta: "",
    };
    customerFound.forEach(
      ({
        CantidadUnitaria,
        NombreReceta,
        PrecioVenta,
        Ganancia,
        FechaVenta,
      }) => {
        // Sumar la cantidad de frascos
        datosCliente.cantidadFrascos += CantidadUnitaria;
        // Agregar o actualizar la cantidad de recetas compradas
        if (datosCliente.recetasMasCompradas[NombreReceta]) {
          datosCliente.recetasMasCompradas[NombreReceta] += CantidadUnitaria;
        } else {
          datosCliente.recetasMasCompradas[NombreReceta] = CantidadUnitaria;
        }
        // Sumar el total en pesos vendido y la ganancia
        datosCliente.totalEnPesosVendido += Number(PrecioVenta);
        datosCliente.totalGanancia += Number(Ganancia);
        datosCliente.fechaUltimaVenta = new Date(FechaVenta);
      }
    );
    
    res.render("./Sales/salesForCustomerDetail", {
      datosCliente,
      customerFound,
    });
  },
  month: async function (req, res) {
    let month_actual = "MONTH(CURRENT_DATE())";
    if (req.params.id) {
      month_actual = req.params.id;
    }
    const ventas2 = await db.Ventas.findAll({
      
      where: {
        VentaEfectiva: 1,
        [Op.and]: [
          Sequelize.literal(`MONTH(FechaVenta) =` + month_actual),
          Sequelize.literal(`YEAR(FechaVenta) = YEAR(CURRENT_DATE())`),
        ],
      },
      order: [[Sequelize.literal("FechaVenta"), "DESC"]],
    });

    // Formatear la fecha en formato español
    const opcionesFormato = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const ventas = ventas2.map((venta) => {
      const fechaParseada = new Date(venta.FechaVenta);
      const fechaFormateada = fechaParseada.toLocaleString(
        "es-AR",
        opcionesFormato
      );
      
      return {
        NombreCliente: venta.NombreCliente,
        FechaVenta: fechaFormateada,
        NombreReceta: venta.NombreReceta,
        PrecioVenta: venta.PrecioVenta,
        Ganancia: venta.Ganancia,
      };
    });

    // Esta expresion funciona para una sola columna
    // Intento otro metodo para traer 2 columnas.
    // const ventasTotalMes = await db.Ventas.sum('PrecioVenta',
    //   {
    //     where: {
    //       VentaEfectiva : 1, 
    //       [Op.and]: [Sequelize.literal(`MONTH(FechaVenta) =` + month_actual)]
    //     }
    // });
    const ventasTotalMes = await db.Ventas.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('PrecioVenta')), 'TotalVentas'],
        [Sequelize.fn('SUM', Sequelize.col('Ganancia')), 'TotalGanancias']
      ],
      raw: true,
      where:{
             VentaEfectiva : 1, 
           [Op.and]: [Sequelize.literal(`MONTH(FechaVenta) =` + month_actual)]
           }
    })
    console.log('✅linea 167 Sales Controller: ', ventas)
    res.render("./Sales/salesForMonth", { ventas, ventasTotalMes });
  },
   

  year: function (req, res) {
    res.send("llego por year");
    // res.render('sales')
  },

  recipe: function (req, res) {
    res.render("./Sales/salesForRecipe");
  },

  flavor: function (req, res) {
    res.render("./Sales/salesForFlavor");
    // res.send('Lego por salesForFlavor');
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

module.exports = salesController;
