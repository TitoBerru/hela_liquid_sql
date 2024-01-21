const { DATE } = require("sequelize");
const db = require("../../database/models");
const { literal } = require('sequelize');
const quoteService = require('../services/quoteService')

const salesCostServiceSql = {
  base: (cliente, idReceta, ml, nico, cantidad) => {
    // Implementar la lógica base aquí...
  },

  consulta: async (cliente, idReceta, ml, nico, cant, pcioVenta, ventaEfectiva) => {
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

  if (aroma.Moneda === 'USO') {
    costoUnitarioModificado = aroma.CostoUnitario * valorDolarOf;
  } else if (aroma.Moneda === 'USP'){
    costoUnitarioModificado = aroma.CostoUnitario * valorDolarblue;
  }else{
    costoUnitarioModificado = aroma.CostoUnitario
  }
  return {
    nombre: aroma.NombreAroma,
        id: aroma.aroma_cantidad.IDAroma,
        cantidad: Number(aroma.aroma_cantidad.CantidadAroma),
        costoUnitario: costoUnitarioModificado,
  }


        
      });
      // console.log('✅🛑✅ linea 39 salesCostSeviceSQL con esenciasUtilizadas: ',esenciasUtilizadas)
      // console.log('console.log linea 36 salesCostSeviceSQL con cantidad de esencia: ',esenciasUtilizadas[0].cantidad)
      // esenciasUtilizadas[0].CantidadAroma
      const idEsenciasUtilizadas = consultoReceta.aromas.map(
        (aroma) => aroma.aroma_cantidad.IDAroma
      );
        // Traigo los 
      const consultoBaseIngredientes = await db.Ingredientes.findAll({
        attributes: ["NombreIngrediente", "Costo"],
      });

      const valoresUnitariosIngredientes = consultoBaseIngredientes.map(
        (ingrediente) => ({
          nombreIngrediente: ingrediente.NombreIngrediente,
          costo: ingrediente.Costo,
        })
      );
        //Costo Total de esencias por Receta
      const valorTotalEsencias = esenciasUtilizadas.reduce(
        (total, aroma) =>
          total +
          (aroma.costoUnitario * aroma.cantidad * ml) / 100,
        0
      );
        // Total de PG usada en recetas, por aromas
      const porcentajeTotalEsencias = esenciasUtilizadas.reduce((cont, porcentaje)=>{
        return cont + porcentaje.cantidad
      },0)
    
      //Costo Frasco
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
          100) * ml;

            //Costo PG
      const costoTotalPg =  
        (valoresUnitariosIngredientes.find(
          (ingrediente) => ingrediente.nombreIngrediente === "PG"
        )?.costo * (20-porcentajeTotalEsencias)*ml/100|| 0 );

        // Costo VG
        const costoTotalVg =  
        (valoresUnitariosIngredientes.find(
          (ingrediente) => ingrediente.nombreIngrediente === "VG"
        )?.costo * 80*ml/100|| 0 )
       
      
      const valorTotalReceta = (costoTotalPg+costoTotalVg+Number(valorFrasco) + Number(valorTotalEsencias) + Number(valorEnRecetaNico) )*cant;


         

        await db.Ventas.create({
          CantidadUnitaria: cant,
          FechaVenta: new Date(),
          IDReceta: idReceta,
          NombreCliente: cliente,
          NombreReceta: consultoReceta.NombreReceta,
          CostoTotalEsencia: valorTotalEsencias,
          CostoTotalBase : (costoTotalPg + costoTotalVg),
          CostoTotalNico: valorEnRecetaNico, 
          CostoFrasco : Number(valorFrasco),
          CostoTotal : valorTotalReceta,
          PrecioVenta: pcioVenta,
          Ganancia : pcioVenta-valorTotalReceta,
          VentaEfectiva: ventaEfectiva
        })

        // Intento metodo para bulk, con varios ids y porcentajes.
        const updates = esenciasUtilizadas.map((element) => ({
        
          id: element.id,
          CantidadDisponible: element.cantidad
        }));
        // console.log('console.log linea 135 sales Cost Services ',updates[0].id)
        
        for(let i=0; i<updates.length; i++){
          await db.Aromas.update({'CantidadDisponible': literal('CantidadDisponible -'+ updates[i].CantidadDisponible)},{
            where:{
                ID : updates[i].id
                }
          }

          )
        }

      // console.log('id de la receta',idReceta)
      // console.log('PG', costoTotalPg)
      // console.log('PorcentajeTotalEsencias:  ' ,porcentajeTotalEsencias)
      // console.log("Valor del Frasco (valorFrasco): ", Number(valorFrasco));
      // console.log("valor total esencias(valorTotalEsencias): ", valorTotalEsencias);
      // console.log("valor de la nico (valorEnRecetaNico): ", valorEnRecetaNico);
      // console.log('valor total receta(valorTotalReceta)', valorTotalReceta)
      // return cmv;
      
    } catch (error) {
      console.error("Error en la consulta:", error);
    }
    
  },
};
// (cliente, idReceta, ml, nico, cant, pcioVenta)
// salesCostServiceSql.consulta("Tito", 56, 100, 9,2,5000);
module.exports = salesCostServiceSql;
