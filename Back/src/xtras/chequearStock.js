function calcularRecetasConStock(recetas, recetasSeleccionadas) {
  const stockAromas = {}; // Guardamos el stock actualizado de cada aroma
  const resultado = [];

  // Iteramos sobre las recetas seleccionadas
  recetasSeleccionadas.forEach((seleccion) => {
    const receta = recetas.find((r) => r.ID === seleccion.recetaID);

    if (!receta) {
      resultado.push({
        recetaID: seleccion.recetaID,
        mensaje: `Receta con ID ${seleccion.recetaID} no encontrada.`,
      });
      return;
    }

    const aromasArray = Array.isArray(receta.aromas) ? receta.aromas : [receta.aromas]; // Por si aromas es un array o un objeto único
    const aromasResultado = [];

    // Iteramos sobre todos los aromas de la receta
    aromasArray.forEach((aroma) => {
      const porcentajeAroma = parseFloat(aroma.aroma_cantidad.CantidadAroma);
      const cantidadAromaNecesaria = (porcentajeAroma / 100) * seleccion.cantidadMililitros;

      // Inicializamos el stock de cada aroma si no existe aún en el registro
      if (!(aroma.ID in stockAromas)) {
        stockAromas[aroma.ID] = parseFloat(aroma.CantidadDisponible);
      }

      // Verificamos el stock disponible actual
      const stockDisponibleActual = stockAromas[aroma.ID];
      const suficienteStock = stockDisponibleActual >= cantidadAromaNecesaria;

      // Actualizamos el stock del aroma restando la cantidad necesaria
      if (suficienteStock) {
        stockAromas[aroma.ID] -= cantidadAromaNecesaria;
      }

      // Agregamos los resultados para este aroma
      aromasResultado.push({
        NombreAroma: aroma.NombreAroma,
        CantidadNecesaria: cantidadAromaNecesaria,
        StockDisponibleAntes: stockDisponibleActual,
        StockRestante: stockAromas[aroma.ID],
        SuficienteStock: suficienteStock,
      });
    });

    // Agregamos los resultados de la receta
    resultado.push({
      NombreReceta: receta.NombreReceta,
      CantidadFabricar: seleccion.cantidadMililitros,
      Aromas: aromasResultado,
    });
  });

  return resultado;
}

// Ejemplo de uso:
const recetas = [
  {
    ID: 56,
    NombreReceta: "LIMOIX",
    TipoReceta: "postre",
    Descripcion: "postre limonado",
    aromas: [
      {
        NombreAroma: "Dairy Milk TPA",
        ID: 1343,
        CantidadDisponible: "13.00",
        aroma_cantidad: {
          id: 98,
          CantidadAroma: "4.00"
        }
      },
      {
        NombreAroma: "French Vainilla CAP",
        ID: 1299,
        CantidadDisponible: "15.00",
        aroma_cantidad: {
          id: 99,
          CantidadAroma: "3.00"
        }
      }
    ]
  },
  {
    ID: 57,
    NombreReceta: "CHOCO CREAM",
    TipoReceta: "postre",
    Descripcion: "postre chocolate",
    aromas: [
      {
        NombreAroma: "Dairy Milk TPA",
        ID: 1343,
        CantidadDisponible: "13.00",
        aroma_cantidad: {
          id: 100,
          CantidadAroma: "5.00"
        }
      }
    ]
  },
  {
    ID: 67,
    NombreReceta: "FANILA",
    TipoReceta: "POSTRE",
    Descripcion: "POSTRE LIMONADO",
    aromas: {
      NombreAroma: "Dairy Milk TPA",
      ID: 1343,
      CantidadDisponible: "130.00",
      aroma_cantidad: {
        id: 127,
        CantidadAroma: "6.00"
      }
    }
  },
  {
    ID: 67,
    NombreReceta: "FANILA",
    TipoReceta: "POSTRE",
    Descripcion: "POSTRE LIMONADO",
    aromas: {
      NombreAroma: "French Vainilla CAP",
      ID: 1299,
      CantidadDisponible: "15.00",
      aroma_cantidad: {
        id: 128,
        CantidadAroma: "5.00"
      }
    }
  }
];

// Input del usuario - selecciona recetas y cantidades
const recetasSeleccionadas = [
  { recetaID: 56, cantidadMililitros: 100 },
  { recetaID: 57, cantidadMililitros: 200 },
  { recetaID: 67, cantidadMililitros: 500 },
];

// Calcular si se puede realizar cada receta
const resultado = calcularRecetasConStock(recetas, recetasSeleccionadas);

console.log(JSON.stringify(resultado, null, 2));
