const { json, DATE } = require("sequelize");
let db = require("../../database/models");
const recipesController = {
  
  
    ingredientes: async  (res) => {
      try {

        // Obtener los datos de la nueva receta desde la solicitud del cliente
        const nuevaReceta = {
            TipoIngrediente: "Base",
          NombreIngrediente: "Pedro22",
          CantidadDisponible: 10000200.54,
          UnidadMedida: "Ml2",
          Costo: 300,
          FechaRegistro:new Date(),
         
          
        };
  
        // Crear la nueva receta en la base de datos
        const recetaCreada = await db.Ingredientes.create(nuevaReceta);
  
        
  
        // Enviar la receta creada como respuesta
        // res.status(201).json(recetaCreada);
        
      } catch (error) {
        console.error('Error al crear la receta:', error);
        // res.status(500).json({ error: 'Ocurrió un error al crear la receta' });
      }
    }
  

};
recipesController.ingredientes("jds")
module.exports = recipesController;
