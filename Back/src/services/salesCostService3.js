const path = require("path");
const fs = require("fs");

const loadData = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf-8"));

//rutas de JSONs
const dataPaths = {
    baseCosts: path.join(__dirname, "../dataBase/costsJson.json"),
    recipes: path.join(__dirname, "../dataBase/recipesJson.json"),
    flavors: path.join(__dirname, "../dataBase/flavorsJson.json"),
    cmvStorage: path.join(__dirname, "../dataBase/cmvJson.json"),
    salesStorage: path.join(__dirname, "../dataBase/salesJson.json"),
};

// Cargar datos de los archivos JSON
const loadedData = Object.fromEntries(
    Object.entries(dataPaths).map(([key, filePath]) => [key, loadData(filePath)])
);
// Funciones auxiliares
const calculateTotalVG = (ml) => (80 * ml) / 100;
const calculateTotalPG = (ml) => ml - calculateTotalVG(ml);

const uid = () => Math.random().toString(36) + Date.now().toString(36);

const updateStorage = (filePath, newData) => {
    const storageData = loadData(filePath);
    storageData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(storageData));
};

const salesCostService ={
    
    base: (customer,recetaid, ml , nico, cant)=> {
        // Unidad de medida en ML para todo!!!!!!
        
        recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
        let costs = JSON.parse(fs.readFileSync(costsFilePath, "utf-8"));
        let documentoDeVenta = {}; //data del docu de venta, customer, cantidades, etc.
        let documentoCostoDeVenta = {}; // costos de todo el docu de Ventas.
        let esenciasDeReceta=[]; // EN ESENCIAS DE RECETA GUARDO LAS ESENCIAS UTILIZADAS EN LA RECETA
        documentoDeVenta.IdDocumentoDeVenta= uid();
        documentoDeVenta.createdAt=new Date().toLocaleString();
        documentoDeVenta.customer = customer;
        documentoDeVenta.nico = nico;
        documentoDeVenta.ml=ml;
        documentoDeVenta.totalVg= 80*ml/100;
        documentoDeVenta.quantity = cant;
        documentoDeVenta.precioVenta = price;

        // comienzo a recorrer arrays
        for(let i=0; i<recipes.length; i++){
            if(recipes[i].idRecipe == recetaid){
                esenciasDeReceta.push(recipes[i].flavors);
                documentoDeVenta.recipe = recipes[i].name;
                documentoCostoDeVenta.recipe = recipes[i].name;
            }
        }
        // EN TOTAL PORCENTAJE ESENCIA SUMO LOS PORCENTAJES DE CADA ESENCIA
        // ESTE PORCENTAJE DEBERA RESTAR AL TOTAL DE LA RECETA DEL PG EN BASE AL TOTAL
     
        let totalPorcentajeEsencia=0
        let esenciasUsadas=[]
        esenciasDeReceta[0].forEach(esencia =>{
            totalPorcentajeEsencia = totalPorcentajeEsencia + Number(esencia.percent);
            
            documentoDeVenta.totalDePgEnLasEsencias = totalPorcentajeEsencia*ml/100;
            documentoDeVenta.restoPgPuro = ml-documentoDeVenta.totalDePgEnLasEsencias-documentoDeVenta.totalVg
            // AGREOGO EL DATO AL OBJETO DOCUMENTO DE VENTA
          
            if(esencia.flavor != ""){esenciasUsadas.push(esencia.flavor, esencia.percent)}
        })
        
        let numeroDeSabor= 1;
        for(i=0; i<esenciasUsadas.length; i+=2){
            
            documentoDeVenta[`esencia${numeroDeSabor}`]=esenciasUsadas[i];
            documentoDeVenta[`porcentaje${numeroDeSabor}`]=esenciasUsadas[i+1];
            numeroDeSabor +=1;
        }
        
        // items que guardan info en documento de Venta y documento de costo de vta
        // CALCULAR EL VALOR POR ML DE NICO, VG, PG
        documentoCostoDeVenta.nico = Math.round((documentoDeVenta.nico * documentoDeVenta.ml/100)*costs.Nico);
        documentoCostoDeVenta.Vg = Math.round(documentoDeVenta.totalVg * costs.VG);
        documentoCostoDeVenta.Pg = Math.round(documentoDeVenta.restoPgPuro * costs.PG);
        documentoCostoDeVenta.totalEsencias = 0;
        // Precio del envase
       documentoCostoDeVenta.frasco = costs.Frasco100;
        // BUSCAR PRECIOS DE LAS ESENCIAS UTILIZADAS.
        
        for(let i = 0; i<esenciasUsadas.length; i++){ //recorro aray de esencias usadas
            
            for(let x = 1; x<flavors.length; x++){ //array comienza con 1, por flavor 0 es null;
              
                if (flavors[x].name == esenciasUsadas[i]){
                  
                    documentoCostoDeVenta[`esencia${i}`] = Math.round((esenciasUsadas[i+1] * ml /100) * flavors[x].price);
                    documentoCostoDeVenta.totalEsencias += Math.round((esenciasUsadas[i+1] * ml /100) * flavors[x].price); 
                   
                }
            }
        }
        documentoCostoDeVenta.createdAt=new Date().toLocaleString();
        documentoCostoDeVenta.customer = customer;
        documentoCostoDeVenta.ml=Number(ml);
        documentoCostoDeVenta.quantity = Number(cant);
        documentoCostoDeVenta.IdDocumentoCostoDeVenta = documentoDeVenta.IdDocumentoDeVenta;
        documentoCostoDeVenta.precioVenta = Number(price);
        // ********   Agrego el documento Costo de Venta a JSON **********
    let cmvStorage = fs.readFileSync("./src/database/cmvJson.json", {
        encoding: "utf-8",
      }); //leo el archivo
      let jsoncmvStorage;
      if (cmvStorage == "") {
        //valido si esta vacio
        jsoncmvStorage = []; //si esta vacio dejo un array vacio
      } else {
        jsoncmvStorage = JSON.parse(cmvStorage); // sino es vacio lo parseo a json
      }
  
      jsoncmvStorage.push(documentoCostoDeVenta); // ahi subo la nueva venta (cmv)
      let jsoncmvStorageJson = JSON.stringify(jsoncmvStorage); // vuelvo a JSON
      fs.writeFileSync("./src/database/cmvJson.json", jsoncmvStorageJson); //SobreEscribo el archivo
      // Termina logica de archivo Json

         // ********   Agrego el documento de Venta a JSON **********
    let salesStorage = fs.readFileSync("./src/database/salesJson.json", {
        encoding: "utf-8",
      }); //leo el archivo
      let jsonSalesStorage;
      if (salesStorage == "") {
        //valido si esta vacio
        jsonSalesStorage = []; //si esta vacio dejo un array vacio
      } else {
        jsonSalesStorage = JSON.parse(salesStorage); // sino es vacio lo parseo a json
      }
  
      jsonSalesStorage.push(documentoDeVenta); // ahi subo la nueva venta (cmv)
      let jsonSalesStorageJson = JSON.stringify(jsonSalesStorage); // vuelvo a JSON
      fs.writeFileSync("./src/database/salesJson.json", jsonSalesStorageJson); //SobreEscribo el archivo
      // Termina logica de archivo Json     
      return documentoCostoDeVenta, documentoDeVenta;
         
    }
}





module.exports = salesCostService;