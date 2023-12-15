let db = require("../../database/models");
const recipesController = {
  list: function (req, res) {
    db.Recetas.findAll().then(function (receta) {
      // res.send(receta)
      res.render("recipe/recipes", { receta });
    });
  },
  create: function (req, res) {
    db.Aromas.findAll()
    .then(function (aroma) {
      // res.send(aroma)

      res.render("recipe/create", { aroma });
    });
  },
  search: function (req, res) {
    res.render("recipe/results");
  },
  edit: function (req, res) {
    res.render("./recipe/edit");
  },
  detail: async function (req, res) {
    try {
      const recetaId = req.params.id; // Obtener el ID de la receta desde los parámetros de la URL
      const receta = await db.Recetas.findOne({
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
      });

      // Verificar si se encontró la receta
      if (receta) {
        // Enviar la receta al cliente en formato JSON
        // res.json(receta);
        res.render("recipe/recipeDetail", { receta });
      } else {
        res.status(404).json({ error: "Receta no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      res.status(500).json({ error: "Ocurrió un error al obtener la receta" });
    }
  },

  storeRecipe2: function (req, res) {
    const nuevaReceta = req.body
    // const modificada = nuevaReceta.map(function(ele){
    // ele + "hola"
    // })
    res.send(nuevaReceta)
    // res.redirect("/recipes");
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
  
        for (let i = 1; i <= 8; i++) {
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
        // res.status(201).json(recetaCreada);
        res.redirect("/recipes")
      } catch (error) {
        console.error('Error al crear la receta:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear la receta' });
      }
    },
  

  updateRecipe: function (req, res) {
    res.redirect("/recipes");
  },

  deleteRecipe: function (req, res) {
    res.redirect("/recipes");
  },
};

module.exports = recipesController;
