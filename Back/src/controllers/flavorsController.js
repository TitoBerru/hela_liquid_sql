
const db = require('../../database/models')
const { Op } = require("sequelize");
let optionsOrder = {order: [['NombreAroma','ASC']]}
const flavorsController = {

  allFlavors: function (req, res) {
    db.Aromas.findAll(optionsOrder)
    .then(function(aroma){
      res.render("Flavors/flavors", {aroma});
    })
  },

  createFlavors: function (req, res) {
    res.render("Flavors/flavorCreate");
  },

  storeFlavors: function (req, res) {
    db.Aromas.create({
      NombreAroma: req.body.name,
      CantidadDisponible: req.body.stock,
      Proveedor:req.body.provider,
      CostoUnitario:req.body.price,
      Marca: req.body.brand,
      FechaRegistro : new Date()
    })


    // res.send(req.body)
    res.redirect("/flavors");
  },

  search: async function (req, res) {
    const flavorFound = await db.Aromas.findAll({
      where:{

        NombreAroma:{
          [Op.like]: `%${req.query.searchFlavor}%`,
        }

      }
    })
    res.render("flavors/flavorResults", {flavorFound : flavorFound });
},

  edit: function (req, res) {
    db.Aromas.findByPk(req.params.id)
    .then(function(aroma){
    // res.send(aroma)
      res.render("flavors/flavorEdit", { aroma });
    })
    
  },
  updateFlavor: function (req, res) {
    db.Aromas.update({
      NombreAroma: req.body.name,
      CantidadDisponible: req.body.stock,
      Proveedor:req.body.provider,
      CostoUnitario:req.body.price,
      Marca: req.body.brand,
      FechaRegistro: new Date()
    }, {
      where:{
        id: req.params.id
      }
    })
  
    res.redirect("/flavors");
  },

  deleteFlavor: function (req, res) {
    db.Aromas.destroy({
      where:{
        id:req.params.id
      }
    })
    res.redirect("/flavors");
    },

  detail: function (req, res) {

    db.Aromas.findByPk(req.params.id)
    .then(function(aroma){
      res.render("flavors/flavorDetail", {aroma});
      // res.send(aroma)
    })
  }
 
 
};

module.exports = flavorsController;
