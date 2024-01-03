
const db = require('../../database/models')
const { Op } = require("sequelize");
const preciosController = {
    
    'allPrices' : async function (req, res){
        await db.Precioestimadoventa.findAll({order: [['RangoNico', 'ASC']]})
        .then(function(precio){
            // res.send(precio)
            res.render('precios', {precio});
        //   res.render("Flavors/flavors", {aroma});
        })
        
    }

};

module.exports = preciosController;