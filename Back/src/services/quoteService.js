// BING CON CHAPT GPT
const db = require("../../database/models");
const url = "https://dolarapi.com/v1/dolares";

// Definir constantes para los tipos de moneda
const DOLAR_BLUE = "DolarBlue";
const DOLAR_OFICIAL = "DolarOficial";


// Definir una función para obtener la fecha de fin según la hora actual
const getEndDate = (fechaActual) => {

  const horaActual = fechaActual.getHours();
  // console.log('🟢 linea 14 quoteServices', horaActual)
  // const horaActual = 16;
  // Definir las horas límite para el rango de cotización
  const horaAntesRango= 9;
  const horaInicio = 10;
  const horaFin = 15;
  // Definir las fechas de fin para antes, durante y después del rango
  let endDateAntesRango = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    fechaActual.getDate(),
    horaAntesRango-2,
    0,
    0
  );
  let endDateEnRango = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    fechaActual.getDate(),
    horaFin-3,
    0,
    0
  );
  let endDateDespuesRango = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    fechaActual.getDate() + 1, // Añadir un día
    horaAntesRango-2,
    0,
    0
  );
  // Devolver la fecha de fin según la hora actual
  if (
    horaActual >= horaInicio &&
    horaActual <= horaFin
  ) {
    return endDateEnRango;
  } else if (horaActual < horaInicio) {
    return endDateAntesRango;
  } else {
    return endDateDespuesRango;
  }
};

// Definir una función para actualizar la cotización de una moneda en la base de datos
const updateCotizacion = async (tipoMoneda, cotizacion, fechaActual) => {
  try {
    // Obtener la fecha de fin
    let endDate = getEndDate(fechaActual);

    // Actualizar la cotización en la base de datos
    await db.Cotizacionmonedas.update(
      {
        Cotizacion: cotizacion,
        End_Date: endDate,
        Start_Date: fechaActual,
      },
      {
        where: {
          TipoMoneda: tipoMoneda,
        },
      }
    );
  } catch (error) {
    console.log(
      `⛔ Error al grabar cotización de ${tipoMoneda} en base: ⛔`,
      error.message
    );
  }
};

// Definir un objeto para el servicio de cotización
const quoteService = {
  // Definir un método para obtener los datos de cotización
  data: async function () {
    // Inicializar las variables para los valores de las monedas
    let valorDolarblue = 0;
    let valorDolarOf = 0;
    let fechaActual = new Date();

    // Obtener los valores en la base de datos
    const valoresEnBaseDatos = await db.Cotizacionmonedas.findAll({
      raw: true,
    });

    // Verificar si los valores en la base de datos están vigentes
    if (
      valoresEnBaseDatos[0].End_Date >= fechaActual ||
      valoresEnBaseDatos[0].End_Date === null
    ) {
      // Recorrer los valores en la base de datos y asignarlos a las variables
      for (let valor of valoresEnBaseDatos) {
        if (valor.TipoMoneda === DOLAR_BLUE) {
          valorDolarblue = valor.Cotizacion;
        } else if (valor.TipoMoneda === DOLAR_OFICIAL) {
          valorDolarOf = valor.Cotizacion;
        }
        fechaActual = valor.Start_Date;
      }
      // Devolver los valores de las monedas y la fecha actual
      return { valorDolarOf, valorDolarblue, fechaActual };
    } else {
      // Obtener los datos de la API
      try {
        // Hacer la solicitud a la API
        const response = await fetch(url);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Recorrer los datos y asignarlos a las variables
        for (let element of data) {
          if (element.casa == "blue") {
            valorDolarblue = element.venta;
          } else if (element.casa == "oficial") {
            valorDolarOf = element.venta;
          }
        }

        // Actualizar la cotización de las monedas en la base de datos
        await updateCotizacion(DOLAR_BLUE, valorDolarblue, fechaActual);
        await updateCotizacion(DOLAR_OFICIAL, valorDolarOf, fechaActual);

        // Devolver los valores de las monedas y la fecha actual
        return { valorDolarOf, valorDolarblue, fechaActual };
      } catch (error) {
        // Manejar el error
        console.error("Error al obtener los datos:", error.message);
        // Devolver los valores de las monedas y la fecha actual
        return { valorDolarOf, valorDolarblue, fechaActual };
      }
    }
  },
};

// Exportar el servicio de cotización
module.exports = quoteService;
