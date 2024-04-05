let db = require("../../database/models");
const optionsClientsOrder = {order: [['Nombre','ASC']]}

const customerController = {

  index: async function (req, res) {
   
  
    await db.Clientes.findAll(optionsClientsOrder)
    .then(function(clientes){
      res.render('./customers/customer', { clientes } )
    
    })
  },
  create:function(req, res){
    res.render('customers/customerCreate')
    // res.send('LLego por Create GET CLIENTE')

  },
  storeCustomer: async function(req, res){
    await db.Clientes.create({
      Nombre:req.body.name.toUpperCase(),
      Apellido: req.body.lastName.toUpperCase(),
      Telefono: req.body.tel,
      Email: req.body.email.toUpperCase(),
      Direccion: req.body.direccion.toUpperCase(),
      Localidad: req.body.localidad.toUpperCase(),
      Provincia: req.body.provincia.toUpperCase(),
      Edad: req.body.edad ,
      FechaRegistro: new Date()
    })
    res.redirect('/customer')

  }

};

module.exports = customerController;