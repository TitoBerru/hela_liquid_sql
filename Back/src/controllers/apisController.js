const { json } = require("sequelize");
let db = require("../../database/models");
const apisController = {
  list: function (req, res) {
    db.Recetas.findAll().then(function (receta) {
      // res.send(receta)
      res.send(receta);
    });
  },
  create: function (req, res) {
   res.json("Funcionalidad API Create aun no desarrollada")
  },
  search: function (req, res) {
    res.json("Funcionalidad API Search aun no desarrollada")
  },
  edit: async function (req, res) {
    // FUNCIONALIDAD QUE FUNCIONA EN BACK END.
    // try {
    //   const recetaId = req.params.id; // Obtener el ID de la receta desde los parámetros de la URL
    //   const recipeToEdit = await db.Recetas.findOne({
    //     where: { ID: recetaId },
    //     attributes: [ "NombreReceta", "TipoReceta", "Descripcion"],
    //     include: [
    //       {
    //         model: db.Aromas,
    //         as: "aromas",
    //         attributes: ["NombreAroma"],
    //         through: {
    //           model: db.Recetaaromas,
    //           as: "aroma_cantidad", // Alias diferente
    //           attributes: ["CantidadAroma"],
    //         },
    //       },
    //     ],
    //   });

    //   // Verificar si se encontró la receta
    //   if (recipeToEdit) {
    //     // Enviar la receta al cliente en formato JSON
    //     // res.json(receta);
    //     // for (let i=0; i<= recipeToEdit.length; i++){
    //     //   console.log("console desde linea 44 de recipes controler: " + recipeToEdit[i])}
        
    //     res.render("recipe/edit", { recipeToEdit, recetaId });
    //     //  res.send(recetaId);
    //   } else {
    //     res.status(404).json({ error: "Receta no encontrada" });
    //   }
    // } catch (error) {
    //   console.error("Error al obtener la receta:", error);
    //   res.status(500).json({ error: "Ocurrió un error al obtener la receta" });
    // }
    res.json("Funcionalidad API Edit aun no desarrollada")
  },
  detail: async function (req, res) {
    try {
      const recetaId = req.params.id; // Obtener el ID de la receta desde los parámetros de la URL
      const receta = await db.Recetas.findAll({
        where: { ID: recetaId },
        attributes: ["NombreReceta", "TipoReceta", "Descripcion"],
        include: [
          {
            model: db.Aromas,
            as: "aromas",
            attributes: ["NombreAroma"],
            through: {
              model: db.Recetaaromas,
              as: "aroma_cantidad", // Alias diferente
              attributes: ["CantidadAroma"],
            },
          },
        ],
        raw: true,
        nest: true
      });

      // Verificar si se encontró la receta
      if (receta) {
        // Enviar la receta al cliente en formato JSON
        // res.json(receta);
        // console.log(receta)
        // res.send(receta)
        res.json( receta );
      } else {
        res.status(404).json({ error: "Receta no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      res.status(500).json({ error: "Ocurrió un error al obtener la receta" });
    }
  },
    storeRecipe: async function (req, res) {
      try {
        // Obtener los datos de la nueva receta desde la solicitud del cliente
        const nuevaReceta = {
          NombreReceta: req.body.name,
          TipoReceta: req.body.type,
          Descripcion: req.body.description,
          FechaCreacion: new Date()
        };
  
        // Crear la nueva receta en la base de datos
        const recetaCreada = await db.Recetas.create(nuevaReceta);
  
        // Obtener y procesar los sabores y porcentajes
        const saboresYPorcentajes = [];
  
        for (let i = 1; i <= 10; i++) {
          const flavor = req.body[`flavor${i}`];
          const percent = req.body[`percent${i}`];
  
          if (flavor && percent) {
            saboresYPorcentajes.push({
              IDAroma: flavor,
              CantidadAroma: percent,
            });
          }
        }
  
        // Asociar los sabores y porcentajes a la receta en la tabla pivote
        await Promise.all(saboresYPorcentajes.map(async (saborPorcentaje) => {
          // Aquí debes buscar el ID del aroma en función del nombre del aroma
          console.log('sabor y porcentaje total?',saborPorcentaje)
          const aroma = await db.Aromas.findOne({ where: { ID: saborPorcentaje.IDAroma } });
          console.log('id de la receta creada',recetaCreada.id)
          console.log('id del aroma',aroma.id)
          if (aroma) {
            await db.Recetaaromas.create({
              IDAroma: aroma.id,
              IDReceta: recetaCreada.id,
              CantidadAroma: saborPorcentaje.CantidadAroma,
            });
          }
        }));
  
        // Enviar la receta creada como respuesta
        res.status(201).json(recetaCreada);
        // res.redirect("/recipes")
      } catch (error) {
        console.error('Error al crear la receta:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la receta' });
      }
    },
  
// Método para actualizar una receta existente
updateRecipe: async function (req, res) {
  try {
    const recetaId = req.params.id; // Asume que el ID de la receta a actualizar está en los parámetros de la solicitud

    // Obtener los datos actualizados de la receta desde la solicitud del cliente
    const datosActualizados = {
      NombreReceta: req.body.name,
      TipoReceta: req.body.type,
      Descripcion: req.body.description,
    };

    // Actualizar la receta en la base de datos
    const [numFilasActualizadas, recetaActualizada] = await db.Recetas.update(datosActualizados, { where: { id: recetaId }, returning: true });

    // Obtener y procesar los sabores y porcentajes actualizados
    const saboresYPorcentajesActualizados = [];

    for (let i = 1; i <= 8; i++) {
      const flavor = req.body[`flavor${i}`];
      const percent = req.body[`percent${i}`];

      if (flavor && percent) {
        saboresYPorcentajesActualizados.push({
          IDAroma: flavor,
          CantidadAroma: percent,
        });
      }
    }

    // Eliminar los sabores y porcentajes antiguos asociados a la receta
    await db.Recetaaromas.destroy({ where: { IDReceta: recetaId } });

    // Asociar los sabores y porcentajes actualizados a la receta en la tabla pivote
    await Promise.all(saboresYPorcentajesActualizados.map(async (saborPorcentaje) => {
      // Aquí debes buscar el ID del aroma en función del nombre del aroma
      console.log('sabor y porcentaje total?', saborPorcentaje)
      const aroma = await db.Aromas.findOne({ where: { ID: saborPorcentaje.IDAroma } });
      console.log('id de la receta actualizada', recetaActualizada[0].id)
      console.log('id del aroma', aroma.id)
      if (aroma) {
        await db.Recetaaromas.create({
          IDAroma: aroma.id,
          IDReceta: recetaActualizada[0].id,
          CantidadAroma: saborPorcentaje.CantidadAroma,
        });
      }
    }));

    // Enviar la receta actualizada como respuesta
    res.redirect("/recipes");
  } catch (error) {
    console.error('Error al actualizar la receta:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la receta' });
  }
},

  deleteRecipe: async function (req, res) {
    // res.send(req.params.id)
    let recetaABorrar = req.params.id
    await db.Recetaaromas.destroy({ where: { IDReceta: recetaABorrar } });
    await db.Recetas.destroy({ where: { ID: recetaABorrar } });

    
    res.redirect("/recipes")
   
    // res.redirect("/recipes" );
  },
};

module.exports = apisController;
