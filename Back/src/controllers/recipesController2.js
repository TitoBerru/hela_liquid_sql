const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const sortJSON=require("./../xtras/sort")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));

const recipesController = {
  list: function (req, res) {
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    recipes = sortJSON(recipes, 'name', 'asc'); //order by
    res.render("./recipe/recipes", { recipes: recipes });
  },
  create: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    flavors = sortJSON(flavors, 'name', 'asc'); //order by
    
    res.render("./recipe/create", {flavors : flavors});
  },
  search: function (req, res) {
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));

    const searchQuery = req.query.searchRecipe.toUpperCase();

    let recipeFound = [];
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].name.includes(searchQuery) ? recipeFound.push(recipes[i]) : "";
      //  res.send (recipes)
    }
    recipeFound = sortJSON(recipeFound, 'name', 'asc'); //order by
    //  res.send (recipeFound)
    res.render("recipe/results", {
      recipeFound: recipeFound,
    });
  },
  edit: function (req, res) {
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    flavors = sortJSON(flavors, 'name', 'asc'); //order by
    // let id = req.params.id;
    let recipeToEdit = [];
    let flavorsToEditinRecipe = [];
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].idRecipe == req.params.id) {
        recipeToEdit = recipes[i];
        flavorsToEditinRecipe = recipes[i].flavors;
      }
    }

    // res.send(flavorsToEditinRecipe[2])
    
    res.render("./recipe/edit", { recipeToEdit: recipeToEdit, flavors:flavors });
  },
  detail: function(req, res){
    //Traigo de Flavors
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    const recipeToShow=[];
    const recipesUsed= [];
    for (let i=0; i<recipes.length; i++){
      if (recipes[i].idRecipe == req.params.id){
          recipeToShow.push(recipes[i])
        }
       }
    // for (let i=0; i<recipes.length; i++){
    //   recipes[i].flavors.forEach(flavor => 
    //     (flavor.flavor.includes(flavorToShow[0].name)? recipesUsed.push(recipes[i].name):"")
    //   )
    // }
    // duplicated takeoff!!
    // const dataArr = new Set(recipesUsed);
    // let resultRecipesUsed = [...dataArr];
     
    res.render("recipe/recipeDetail", { recipeToShow : recipeToShow });
    // res.send('llgo por detail')
  },
  storeRecipe: function (req, res) {
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    function uid() {
      return Math.random().toString(36) + Date.now().toString(36);
    }

    let newRecipe = {
      idRecipe: uid(),
      name: req.body.name.toUpperCase(),
      type: req.body.type.toUpperCase(),
      description: req.body.description.toUpperCase(),
      img: "",
      createdAt: new Date().toLocaleString(),
      flavors: [
        {
          flavor: req.body.flavor1.toUpperCase(),
          percent: req.body.percent1,
        },
        {
          flavor: req.body.flavor2.toUpperCase(),
          percent: req.body.percent2,
        },
        {
          flavor: req.body.flavor3.toUpperCase(),
          percent: req.body.percent3,
        },
        {
          flavor: req.body.flavor4.toUpperCase(),
          percent: req.body.percent4,
        },
        {
          flavor: req.body.flavor5.toUpperCase(),
          percent: req.body.percent5,
        },
        {
          flavor: req.body.flavor6.toUpperCase(),
          percent: req.body.percent6,
        },
        {
          flavor: req.body.flavor7.toUpperCase(),
          percent: req.body.percent7,
        },
        {
          flavor: req.body.flavor8.toUpperCase(),
          percent: req.body.percent8,
        },
      ],
    };
    // Leer que habia
    let recipesStorage = fs.readFileSync("./src/database/recipesJson.json", {
      encoding: "utf-8",
    }); //leo el archivo
    let jsonRecipesStorage;
    if (recipesStorage == "") {
      //valido si el json de origen esta vacio
      jsonRecipesStorage = []; //si esta vacio dejo un array vacio
    } else {
      jsonRecipesStorage = JSON.parse(recipesStorage); // sino es vacio lo parseo a json
    }

    jsonRecipesStorage.push(newRecipe); // ahi subo la nueva receta
    jsonRecipesStorageJson = JSON.stringify(jsonRecipesStorage); // vuelvo a JSON
    fs.writeFileSync("./src/database/recipesJson.json", jsonRecipesStorageJson); //SobreEscribo el archivo

    res.redirect("/recipes");
  },

  

  updateRecipe: function (req, res) {
    // Leer Archivo JSON de recipes y flavors
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
    // utilizar el params.id para buscar que receta modificar
    let idRecipeToChange = req.params.id;
    let recipeToEdit = [];
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].idRecipe == idRecipeToChange) {
        indexToChange = recipes.indexOf(recipes[i]);
        recipeToEdit = recipes[i];
      }
    }
    // con el dato del ID (params id) aplicar filter para generar un nuevo json, sin los datos viejos de ese id
    recipes = recipes.filter((recipe) => recipe.idRecipe != req.params.id);
    // generar un nuevo documento con los nuevos datos.

    //Grabar los datos sin el doc a modificar
    const jsonRecipes = JSON.stringify(recipes);
    fs.writeFileSync("./src/database/recipesJson.json", jsonRecipes);
    
    // Nueva validacion de si los aromas existen 
    // Funciona, solo hay que decidir que hacer, ya que en este ejemplo, 
    // solo consulto si existe flavorsExisten y envio un res.send simplemente
    // habria q agregar la logica en ese punto
    // console.log(req.body.flavors)
  //   let flavorsExisten = false;
  //   for (let i=0; i<req.body.flavors.length; i++){
  //     for(let x=1; x<flavors.length; x++){
  //       // console.log('los aromas en el json son: '+flavors[x].name);
  //       // console.log('lo que viene del body es: '+req.body.flavors[i]);
  //         if(req.body.flavors[i] == flavors[x].name){
  //         console.log('el que encontre es: '+ flavors[x].idFlavor);
  //         flavorsExisten = true;
  //         } 
  //     }
  //     console.log(req.body)  
  //   }
  // flavorsExisten? res.send('existe'): res.send(flavors);
  // Hasta aca la nueva validacion, la retomo luego o la migro a script.js

  
  // creo los datos para pushear modificados
    let recipeModify = {
      idRecipe: req.params.id,
      name: req.body.name.toUpperCase(),
      type: req.body.type.toUpperCase(),
      description: req.body.description.toUpperCase(),
      img: "",
      createdAt: recipeToEdit.createdAt,
      modifiedAt: new Date().toLocaleString(),
      flavors: [
        {
          flavor: req.body.flavors[0].toUpperCase(),
          percent: req.body.percent[0],
        },
        {
          flavor: req.body.flavors[1].toUpperCase(),
          percent: req.body.percent[1],
        },
        {
          flavor: req.body.flavors[2].toUpperCase(),
          percent: req.body.percent[2],
        },
        {
          flavor: req.body.flavors[3].toUpperCase(),
          percent: req.body.percent[3],
        },
        {
          flavor: req.body.flavors[4].toUpperCase(),
          percent: req.body.percent[4],
        },
        {
          flavor: req.body.flavors[5].toUpperCase(),
          percent: req.body.percent[5],
        },
        {
          flavor: req.body.flavors[6].toUpperCase(),
          percent: req.body.percent[6],
        },
        {
          flavor: req.body.flavors[7].toUpperCase(),
          percent: req.body.percent[7],
        },
      ],
    };
    // console.log('linea 230 recipescontroller: ', req.body)
    // Agrego logica de create
    let recipesStorage = fs.readFileSync("./src/database/recipesJson.json", {
      encoding: "utf-8",
    }); //leo el archivo
    let jsonRecipesStorage;
    if (recipesStorage == "") {
      //valido si esta vacio
      jsonRecipesStorage = []; //si esta vacio dejo un array vacio
    } else {
      jsonRecipesStorage = JSON.parse(recipesStorage); // sino es vacio lo parseo a json
    }

    jsonRecipesStorage.push(recipeModify); // ahi subo la nueva receta
    jsonRecipesStorageJson = JSON.stringify(jsonRecipesStorage); // vuelvo a JSON
    fs.writeFileSync("./src/database/recipesJson.json", jsonRecipesStorageJson); //SobreEscribo el archivo
    // Termina logica de update

    res.redirect("/recipes");
  },

  deleteRecipe: function (req, res) {
    // Leer Archivo JSON de recipes
    recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
    // utilizar el params.id para buscar que receta modificar
    let idRecipeToChange = req.params.id;
    let recipeToEdit = [];
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].idRecipe == idRecipeToChange) {
        indexToChange = recipes.indexOf(recipes[i]);
        recipeToEdit = recipes[i];
      }
    }
    // con el dato del ID (params id) aplicar filter para generar un nuevo json, sin los datos viejos de ese id
    recipes = recipes.filter((recipe) => recipe.idRecipe != req.params.id);
    // generar un nuevo documento con los nuevos datos.
    const jsonRecipes = JSON.stringify(recipes);
    fs.writeFileSync("./src/database/recipesJson.json", jsonRecipes);

    res.redirect("/recipes");
  },
};
JSON.stringify;

module.exports = recipesController;
