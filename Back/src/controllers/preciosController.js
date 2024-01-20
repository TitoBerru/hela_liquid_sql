
const db = require('../../database/models')
const { Op } = require("sequelize");
const date = new Date()
const queryOptions = {where:{'Fecha_Fin': {[Op.gt]: date}},order: [['RangoNico', 'ASC']]}
const preciosController = {
    
    'allPrices' : async function (req, res){
        // await db.Precioestimadoventa.findAll({order: [['RangoNico', 'ASC']]})
        await db.Precioestimadoventa.findAll(queryOptions)
        .then(function(precio){
            // res.send(precio)
            res.render('precios', {precio});
        //   res.render("Flavors/flavors", {aroma});
        })
        
    }

};

module.exports = preciosController;