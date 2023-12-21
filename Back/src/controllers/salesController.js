let db = require("../../database/models");

const salesController = {
  list: function (req, res) {
    //    res.send({status: "ok", nombre:'hola'});
    res.render("sales");
  },
  customer: function (req, res) {
    res.render("sales");
    // res.render('sales')
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
  
     
        res.send('Lego por salesForFlavor');
      
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
