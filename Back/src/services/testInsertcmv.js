const { json } = require("sequelize");
let db = require("../../database/models");
const recipesController = {
  
  
    cmv: async  (res) => {
      try {

        // Obtener los datos de la nueva receta desde la solicitud del cliente
        const nuevaReceta = {
          IdReceta: 44,
          Cliente: "Pedro",
          FechaVenta: new Date(),
          NicoCantidad: 100,
          Ml: 30,
          CantidadUnidades:2,
          PrecioVenta:45000,
          NicoCostoTotal:1345.5,
          VgCostoTotal:156.7,
          PgCostoTotal: 187.4,
          EscenciasTotal:1089.2,
          CostoTotalReceta: 29001.4
          
        };
  
        // Crear la nueva receta en la base de datos
        const recetaCreada = await db.Cmv.create(nuevaReceta);
  
        
  
        // Enviar la receta creada como respuesta
        // res.status(201).json(recetaCreada);
        
      } catch (error) {
        console.error('Error al crear la receta:', error);
        // res.status(500).json({ error: 'Ocurrió un error al crear la receta' });
      }
    }
  

};
recipesController.cmv("jds")
module.exports = recipesController;
