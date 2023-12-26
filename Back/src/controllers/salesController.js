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
  let cantidadFrascos = 0;
  let recetasMasCompradas = [];
  let totalEnPesosVendido = 0;
  let totalGanancia = 0;
  for (let i=0; i<customerFound.length; i++){
    cantidadFrascos += customerFound[i].CantidadUnitaria;
    recetasMasCompradas.push(customerFound[i].NombreReceta);
    totalEnPesosVendido += Number(customerFound[i].PrecioVenta)
    totalGanancia += Number(customerFound[i].Ganancia)
  }
  console.log(cantidadFrascos, recetasMasCompradas, totalEnPesosVendido, totalGanancia)
  // console.log(customerFound[0].CantidadUnitaria)
  res.send(customerFound[0])
    // res.render('./Sales/salesForCustomerDetail', {customerFound, detail})

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
