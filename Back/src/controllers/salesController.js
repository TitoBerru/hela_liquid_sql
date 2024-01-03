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
    // console.log('✅  Console log linea 39 de sales controller',ventas2)
    //  res.send({ventas2});
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
      order: [[Sequelize.literal("Ganancia"), "DESC"]],
    });
    // console.log(ventas[1].dataValues.cliente)
    // res.send(ventas[0])
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
      where: { NombreCliente: req.params.id },
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

    // console.log('console log 109 sales controller, datosCiente: ',datosCliente);
    // console.log(datosCliente.recetasMasCompradas)
    // console.log('linea 113 solo recetas: ', datosCliente.recetasMasCompradas.TRIBECA)

    // console.log(cantidadFrascos, recetasMasCompradas, totalEnPesosVendido, totalGanancia)
    // res.send(customerFound[0])
    // res.send(datosCliente)
    // console.log(customerFound)
    res.render("./Sales/salesForCustomerDetail", {
      datosCliente,
      customerFound,
    });
  },
  month: function (req, res) {
    res.render("./Sales/salesForMonth");
    // res.send({ result });
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
      // res.send(ingredientes);
    });
  },

  // res.render('sales')
};

module.exports = salesController;
