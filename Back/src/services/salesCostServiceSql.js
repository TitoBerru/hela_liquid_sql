const { DATE } = require("sequelize");
const db = require("../../database/models");
const { literal } = require('sequelize');
const quoteService = require('../services/quoteService');
const Sequelize = require("sequelize");

const salesCostServiceSql = {
  base: (cliente, idReceta, ml, nico, cantidad) => {
    // Implementar la lógica base aquí...
  },

  consulta: async (idCliente, cliente, idReceta, ml, nico, cant, pcioVenta, ventaEfectiva) => {
    let cmv = {}
    let valorDolarblue = (await quoteService.data()).valorDolarblue;
    let valorDolarOf = (await quoteService.data()).valorDolarOf;
    try {
      const consultoReceta = await db.Recetas.findOne({
        where: { ID: idReceta },
        attributes: ["NombreReceta", "TipoReceta", "Descripcion"],
        include: [
          {
            model: db.Aromas,
            as: "aromas",
            attributes: ["NombreAroma", "CostoUnitario", "Moneda"],
            through: {
              model: db.Recetaaromas,
              as: "aroma_cantidad",
              attributes: ["CantidadAroma", "IDAroma"],
            },
          },
        ],
      });
      // console.log('✅🛑✅ linea 32 sales cost services ',consultoReceta.aromas)
      const esenciasUtilizadas = consultoReceta.aromas.map((aroma) => {
        let costoUnitarioModificado;

        if (aroma.Moneda === "USO") {
          costoUnitarioModificado = aroma.CostoUnitario * valorDolarOf;
        } else if (aroma.Moneda === "USP") {
          costoUnitarioModificado = aroma.CostoUnitario * valorDolarblue;
        } else {
          costoUnitarioModificado = aroma.CostoUnitario;
        }
        return {
          nombre: aroma.NombreAroma,
          id: aroma.aroma_cantidad.IDAroma,
          cantidad: Number(aroma.aroma_cantidad.CantidadAroma),
          costoUnitario: costoUnitarioModificado,
        };
      });
      // console.log('✅🛑✅ linea 39 salesCostSeviceSQL con esenciasUtilizadas: ',esenciasUtilizadas)
      // console.log('console.log linea 36 salesCostSeviceSQL con cantidad de esencia: ',esenciasUtilizadas[0].cantidad)
      // esenciasUtilizadas[0].CantidadAroma
      const idEsenciasUtilizadas = consultoReceta.aromas.map(
        (aroma) => aroma.aroma_cantidad.IDAroma
      );
      // Traigo los
      const consultoBaseIngredientes = await db.Ingredientes.findAll({
        attributes: [ "id","NombreIngrediente", "Costo"],
      });
      // console.log('🟢linea 61 sale cost service', consultoBaseIngredientes)
      const valoresUnitariosIngredientes = consultoBaseIngredientes.map(
        (ingrediente) => ({
          
          id: ingrediente.id,
          nombreIngrediente: ingrediente.NombreIngrediente,
          costo: ingrediente.Costo,
        })
      );
      // console.log('🟢 Linea 69 sale Cost Service: ',valoresUnitariosIngredientes)
      //Costo Total de esencias por Receta
      const valorTotalEsencias = esenciasUtilizadas.reduce(
        (total, aroma) =>
          total + (aroma.costoUnitario * aroma.cantidad * ml) / 100,
        0
      );
      // Total de PG usada en recetas, por aromas
      const porcentajeTotalEsencias = esenciasUtilizadas.reduce(
        (cont, porcentaje) => {
          return cont + porcentaje.cantidad;
        },
        0
      );

      //Costo Frasco
      let idFrasco =    valoresUnitariosIngredientes.find(
        (ingrediente) => ingrediente.nombreIngrediente == ml
      )?.id;
      const valorFrasco =
        valoresUnitariosIngredientes.find(
          (ingrediente) => ingrediente.nombreIngrediente == ml
        )?.costo || 0;
        
      // Costo nico
      const valorEnRecetaNico =
        ((nico *
          (valoresUnitariosIngredientes.find(
            (ingrediente) => ingrediente.nombreIngrediente === "Nico"
          )?.costo || 0)) /
          100) *
        ml;

      //Costo PG
      const costoTotalPg =
        (valoresUnitariosIngredientes.find(
          (ingrediente) => ingrediente.nombreIngrediente === "PG"
        )?.costo *
          (20 - porcentajeTotalEsencias) *
          ml) /
          100 || 0;

      // Costo VG
      const costoTotalVg =
        (valoresUnitariosIngredientes.find(
          (ingrediente) => ingrediente.nombreIngrediente === "VG"
        )?.costo *
          80 *
          ml) /
          100 || 0;

      const valorTotalReceta =
        (costoTotalPg +
          costoTotalVg +
          Number(valorFrasco) +
          Number(valorTotalEsencias) +
          Number(valorEnRecetaNico)) * cant;


      // SETEO RANGO HORARIO - ARGENTINA

      let fechaActual = new Date();

// Convertir la fecha a la zona horaria de Argentina (UTC -3)
fechaActual.setHours(fechaActual.getHours() - 3);

// Formatear la fecha a 'YYYY-MM-DD HH:mm:ss'
const pad = (n) => (n < 10 ? "0" + n : n);

let year = fechaActual.getFullYear();
let month = pad(fechaActual.getMonth() + 1); // Los meses empiezan desde 0
let day = pad(fechaActual.getDate());
let hours = pad(fechaActual.getHours());
let minutes = pad(fechaActual.getMinutes());
let seconds = pad(fechaActual.getSeconds());

let fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
   // SETEO RANGO HORARIO - ARGENTINA

      await db.Ventas.create({
        CantidadKg: ml,
        CantidadUnitaria: cant,
        FechaVenta: fechaFormateada,
        IDCliente : idCliente,
        IDReceta: idReceta,
        NombreCliente: cliente,
        NombreReceta: consultoReceta.NombreReceta,
        CostoTotalEsencia: valorTotalEsencias,
        CostoTotalBase: costoTotalPg + costoTotalVg,
        CostoTotalNico: valorEnRecetaNico,
        CostoFrasco: Number(valorFrasco),
        CostoTotal: valorTotalReceta,
        PrecioVenta: pcioVenta,
        Ganancia: pcioVenta - valorTotalReceta,
        VentaEfectiva: ventaEfectiva,
      });

      // Metodo Bulk para descontar escencias utilizadas
     
      const updates = esenciasUtilizadas.map((element) => ({
        id: element.id,
        CantidadUtilizada: ((element.cantidad * ml) / 100) * cant,
      }));
      // console.log("✅⛔✅ console.log linea 135 sales Cost Services ", updates);
      if (ventaEfectiva == 1) {
        for (let i = 0; i < updates.length; i++) {
          await db.Aromas.update(
            {
              CantidadDisponible: literal(
                "CantidadDisponible -" + updates[i].CantidadUtilizada
              ),
            },
            {
              where: {
                ID: updates[i].id,
              },
            }
          );
          // AQUI DEBERIA INCLUIR PARA RESTAR STOCK FRASCOS EN UNA VENTA
          if (idFrasco){
            await db.Ingredientes.update(
              {
                CantidadDisponible: literal(
                  "CantidadDisponible -" + cant
                ),
              },
              {
                where: {
                  ID: idFrasco,
                },
              }
            );
          }

        }
      };
      
    } catch (error) {
      console.error("Error en la consulta:", error);
    };
    
    

  },

  
};
// (cliente, idReceta, ml, nico, cant, pcioVenta)
// salesCostServiceSql.consulta("Tito", 56, 100, 9,2,5000);
module.exports = salesCostServiceSql;
