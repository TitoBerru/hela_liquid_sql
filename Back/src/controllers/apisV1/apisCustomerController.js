const { json } = require("sequelize");
let db = require("../../../database/models");

const apisCustomerController = {
  customer: async function (req, res) {
    try {
      const customers = await db.Clientes.findAll({
      
        order: [['Nombre','ASC']]
        
      });
      res.json(customers);
    } catch (error) {
      res.status(500).json("Error al consultar clientes - Error: ", error);
    }
  }

}



module.exports = apisCustomerController;