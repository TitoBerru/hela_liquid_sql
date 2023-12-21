let db = require("../../database/models");
const salesCostService = require ("../services/salesCostServiceSql")
const costController = {

  index: function (req, res) {
  
    db.Ingredientes.findAll()
    .then(function(ingredientes){
      res.render('./costs/costIndex', { ingredientes } )
      // res.send(ingredientes);
    })
  },

   
  edit: function(req, res){
    db.Ingredientes.findByPk(req.params.id)
    .then(function(ingrediente){
      res.render('costs/costsEdit', { ingrediente })
      // res.send(ingrediente)
    })
  
  },
  updateCosts: function(req, res){
    db.Ingredientes.update({
      CantidadDisponible: req.body.cantidad,
      Costo: req.body.costo

    }, {
      where:{
        id:req.params.id
      }
    })
    res.redirect('/costs')
    // res.send(req.body)
  },
  allCosts: function(req, res){
    res.send('llego por AllCost')
  },
    
  calculate: async function (req, res) {
    const recetas = 
    db.Recetas.findAll({
      attributes: ["ID", "NombreReceta"],
      include: [
        {
          model: db.Aromas,
          as: "aromas",
          attributes: ["NombreAroma"],
          through: {
            model: db.Recetaaromas,
            as: "aroma_cantidad", // Alias diferente ya que el otro generaba conflicto
            attributes: ["IDAroma", "CantidadAroma"],
          },
        },
      ],
    });
    ;



    cliente = req.body.cliente;
    idReceta=req.body.receta;
    ml=req.body.ml;
    nico=req.body.nico;
    cant=req.body.cant;
    pcioVenta=req.body.pcioVenta;

    
    const cmv = await salesCostService.consulta(cliente,idReceta,ml,nico, cant, pcioVenta);
    console.log('linea 61 de cost controller',cmv)
   
    // res.send(cmv)
    res.render('index', {recetas:recetas, cmv:cmv});
    // res.send(receta)

  },
  costoVenta: function(req,res){
    res.send('hola')
  },
 

 
};

module.exports = costController;