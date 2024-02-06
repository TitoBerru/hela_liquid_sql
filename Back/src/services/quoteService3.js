// Funciona ok, hecho 100% por HHB

const db = require("../../database/models");

let valorDolarblue = 0;
let valorDolarOf = 0;
let fechaActual = new Date();
let endDateAntesRango = new Date(
  fechaActual.getFullYear(),
  fechaActual.getMonth(),
  fechaActual.getDate(),
  7,
  0,
  0
);
let endDateEnRango = (end_date = new Date(
  fechaActual.getFullYear(),
  fechaActual.getMonth(),
  fechaActual.getDate(),
  12,
  0,
  0
));
const maniana = new Date(fechaActual);
maniana.setDate(maniana.getDate() + 1); // Añadir un día
let endDateDespuesRango = new Date(
  maniana.getFullYear(),
  maniana.getMonth(),
  maniana.getDate(),
  7,
  0,
  0
);
let endDate;

const url = "https://dolarapi.com/v1/dolares";
const quoteService = {
  data: async function () {
    const valoresEnBaseDatos = await db.Cotizacionmonedas.findAll({
      raw: true,
    });
    if (
      valoresEnBaseDatos[0].End_Date >= new Date() ||
      valoresEnBaseDatos[0].End_Date === null
    ) {
      for (i = 0; i < valoresEnBaseDatos.length; i++) {
        valorDolarblue =
          valoresEnBaseDatos[i].TipoMoneda === "DolarBlue"
            ? valoresEnBaseDatos[i].Cotizacion
            : valorDolarblue;
        valorDolarOf =
          valoresEnBaseDatos[i].TipoMoneda === "DolarOficial"
            ? valoresEnBaseDatos[i].Cotizacion
            : valorDolarOf;
        fechaActual = valoresEnBaseDatos[i].Start_Date;
      }
      return { valorDolarOf, valorDolarblue, fechaActual };
    } else {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          data.forEach((element) => {
            if (element.casa == "blue") {
              valorDolarblue = element.venta;
            } else if (element.casa == "oficial") {
              valorDolarOf = element.venta;
            }
          });
          if (data) {
            (async () => {
              try {
                if (
                  fechaActual.getHours() >= 10 &&
                  fechaActual.getHours() <= 15
                ) {
                  endDate = endDateEnRango;
                } else if (fechaActual.getHours() < 10) {
                  endDate = endDateAntesRango;
                } else {
                  endDate = endDateDespuesRango;
                }
                await db.Cotizacionmonedas.update(
                  {
                    Cotizacion: valorDolarblue,
                    End_Date: endDate,
                    Start_Date: fechaActual,
                  },
                  {
                    where: {
                      TipoMoneda: "DolarBlue",
                    },
                  }
                );
                await db.Cotizacionmonedas.update(
                  {
                    Cotizacion: valorDolarOf,
                    End_Date: endDate,
                    Start_Date: fechaActual,
                  },
                  {
                    where: {
                      TipoMoneda: "DolarOficial",
                    },
                  }
                );
              } catch (error) {
                console.log(
                  "⛔ Error al grabar cotizaciones en base: ⛔",
                  error.message
                );
              }
            })();

            return { valorDolarOf, valorDolarblue, fechaActual };
          }

          // Cach al error por si falla la api
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error.message);
        });
      console.log("⛔ linea 109 quoteServices", fechaActual);
      return { valorDolarOf, valorDolarblue, fechaActual };
    }
  },
};

module.exports = quoteService;
