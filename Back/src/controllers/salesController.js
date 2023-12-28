let db = require("../../database/models");
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const salesController = {
  list: function (req, res) {
    //    res.send({status: "ok", nombre:'hola'});
    res.render("sales");
  },
  customer: async function (req, res) {
  const ventas =await db.Ventas.findAll({
    where: { VentaEfectiva: 1 },
    attributes: [
        ['NombreCliente', 'cliente'],
        [Sequelize.fn('count', Sequelize.literal('VentaEfectiva')), 'CantidadDeVentasReales'],
        [Sequelize.fn('sum', Sequelize.literal('PrecioVenta')), 'TotalFacturado'],
        [Sequelize.fn('sum', Sequelize.literal('Ganancia')), 'TotalGanancia'],
        [Sequelize.fn('sum', Sequelize.literal('CostoTotal')), 'CostoTotal'],
      ],
      group: ['NombreCliente'],
      order: [[Sequelize.literal('Ganancia'), 'DESC']],
      
      })
      // console.log(ventas[1].dataValues.cliente)
    // res.send(ventas[0])
    res.render('./Sales/salesForCustomer', {ventas:ventas})
  },
  customerSalesSearch: async function (req, res) {
    const customersFound1 = await db.Ventas.findAll({
      where:{

        NombreCliente:{
          [Op.like]: `%${req.query.searchCustomer}%`
          
        },
        

      },
      order: [[Sequelize.literal('NombreCliente'), 'ASC']],
      
      
    })
    
  
    var hash = {};
    customersFound = customersFound1.filter(function(current) {
      var exists = !hash[current.NombreCliente];
      hash[current.NombreCliente] = true;
      return exists;
    });
    
    res.render("./Sales/salesForCustomerResults", {customersFound : customersFound });
},
salesForCustomerDetail: async function(req, res){
  const customerFound = await db.Ventas.findAll({
    where:{NombreCliente:req.params.id},
    order: [[Sequelize.literal('FechaVenta'), 'DESC']],  
  })
  const datosCliente = {
    nombreCliente : req.params.id, 
    cantidadFrascos: 0,
    recetasMasCompradas: {},
    totalEnPesosVendido: 0,
    totalGanancia: 0,
    fechaUltimaVenta: "",
  };
  
  customerFound.forEach(({ CantidadUnitaria, NombreReceta, PrecioVenta, Ganancia, FechaVenta }) => {
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
    datosCliente.fechaUltimaVenta = new Date( FechaVenta)
  });

  // console.log('console log 109 sales controller, datosCiente: ',datosCliente);
  // console.log(datosCliente.recetasMasCompradas)
  // console.log('linea 113 solo recetas: ', datosCliente.recetasMasCompradas.TRIBECA)
  

  // console.log(cantidadFrascos, recetasMasCompradas, totalEnPesosVendido, totalGanancia)
  // res.send(customerFound[0])
  // res.send(datosCliente)
  // console.log(customerFound)
    res.render('./Sales/salesForCustomerDetail', {datosCliente, customerFound})

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
  
        res.render ("./Sales/salesForFlavor");  
        // res.send('Lego por salesForFlavor');
      
    },
    createSale:function (req, res) {
      const options={
        order:[["FechaVenta", "DESC"]],
        limit: 1
      };
      db.Ventas.findAll(options)
      .then(function(ventas){
        res.send(ventas);
        // res.send(ingredientes);
      })
    }


    
    // res.render('sales')
}


module.exports = salesController;
