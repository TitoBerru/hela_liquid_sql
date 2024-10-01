let db = require("../../database/models");
const salesCostService = require ("../services/salesCostServiceSql")
const costController = {
 // LLamda desde la pagina de costs
  index: async function (req, res) {
  
    await db.Ingredientes.findAll()
    .then(function(ingredientes){
      res.render('./costs/costIndex', { ingredientes } )
      // res.send(ingredientes);
    })
  },

   // LLamda desde la pagina de costs
  edit: async function(req, res){
    await db.Ingredientes.findByPk(req.params.id)
    .then(function(ingrediente){
      res.render('costs/costsEdit', { ingrediente })
      // res.send(ingrediente)
    })
  
  },
  // LLamda desde la pagina de costs
  updateCosts: async function(req, res){
    await db.Ingredientes.update({
      CantidadDisponible: req.body.cantidad,
      Costo: req.body.costo,
      FechaRegistro: new Date()

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
    // llamada desde index, partials/Registrar Venta cuando hace una compra el cliente.
  calculate: async function (req, res) {
    const recetas = 
    await db.Recetas.findAll({
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
    const customerFind = await db.Clientes.findByPk(req.body.cliente)
    
    const obj = JSON.parse(JSON.stringify(req.body));
    // console.log('❎console log linea 62 costController', obj);
    // console.log('console log linea 63 costController', req.body);

    let idCliente = customerFind.id
    let cliente = customerFind.Nombre.toUpperCase(); 
    let idReceta=req.body.receta;
    let ml=req.body.ml;
    let nico=req.body.nico;
    let cant=req.body.cant;
    let pcioVenta=req.body.pcioVenta;
    let VentaEfectiva = req.body.ventaEfectiva;


    
    await salesCostService.consulta(idCliente,cliente,idReceta,ml,nico, cant, pcioVenta, VentaEfectiva);
    
    // console.log('linea 61 de cost controller',cmv)
   
    // res.send(req.body)
    // console.log('cnsole linea 73 de costController, con recetas: ',recetas)
    res.redirect('../');
    // res.redirect('../')
    // res.send(receta)

  },
  costoVenta: function(req,res){
    res.send('hola')
  },
 

 
};

module.exports = costController;