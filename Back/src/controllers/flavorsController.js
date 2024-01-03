
const db = require('../../database/models')
const { Op } = require("sequelize");
let optionsOrder = {where:{AromaActivo : 1},order: [['NombreAroma','ASC']]}
const flavorsController = {

  allFlavors: async function (req, res) {
   await db.Aromas.findAll(optionsOrder)
    .then(function(aroma){
      res.render("Flavors/flavors", {aroma});
    })
  },

  createFlavors: function (req, res) {
    res.render("Flavors/flavorCreate");
  },

  storeFlavors: async function (req, res) {
    await db.Aromas.create({
      NombreAroma: req.body.name,
      CantidadDisponible: req.body.stock,
      Proveedor:req.body.provider,
      CostoUnitario:req.body.price,
      Marca: req.body.brand,
      FechaRegistro : new Date(),
      AromaActivo: 1
    })


    // res.send(req.body)
    res.redirect("/flavors");
  },

  search: async function (req, res) {
    const flavorFound = await db.Aromas.findAll({
      where:{

        NombreAroma:{
          [Op.like]: `%${req.query.searchFlavor}%`,
        },
        'AromaActivo': 1

      }
    })
    res.render("flavors/flavorResults", {flavorFound : flavorFound });
},

  edit: async function (req, res) {
   await db.Aromas.findByPk(req.params.id)
    .then(function(aroma){
    // res.send(aroma)
      res.render("flavors/flavorEdit", { aroma });
    })
    
  },
  updateFlavor: async function (req, res) {
   await db.Aromas.update({
      NombreAroma: req.body.name,
      CantidadDisponible: req.body.stock,
      Proveedor:req.body.provider,
      CostoUnitario:req.body.price,
      Marca: req.body.brand,
      FechaRegistro: new Date(),
      AromaActivo: 1
    }, {
      where:{
        id: req.params.id
      }
    })
  
    res.redirect("/flavors");
  },

  deleteFlavor: async function (req, res) {
   
    await db.Aromas.update({'AromaActivo': 0},{
      where:{
        id:req.params.id
      }
    })
    res.redirect("/flavors");
    },

  detail: async function (req, res) {

    await db.Aromas.findByPk(req.params.id)
    .then(function(aroma){
      res.render("flavors/flavorDetail", {aroma});
      // res.send(aroma)
    })
  }
 
 
};

module.exports = flavorsController;
