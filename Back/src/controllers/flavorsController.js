
let db = require('../../database/models')

const flavorsController = {
  allFlavors: function (req, res) {
    db.Aromas.findAll()
    .then(function(aroma){
      res.send(aroma)
    }
    )
    // res.send('llego por flavor')
   
    // res.render("Flavors/flavors");
  },

  createFlavors: function (req, res) {
    res.render("Flavors/flavorCreate");
  },

  storeFlavors: function (req, res) {
    
    res.redirect("/flavors");
  },

  search: function (req, res) {
   
    res.render("flavors/flavorResults");
  },

  edit: function (req, res) {
    res.render("flavors/flavorEdit");
  },
  updateFlavor: function (req, res) {
  
    res.redirect("/flavors");
  },

  deleteFlavor: function (req, res) {

    res.redirect("/flavors");
    },

  detail: function (req, res) {
    
    res.render("flavors/flavorDetail");
    // res.send('llgo por detail')
  }
 
 
};

module.exports = flavorsController;
