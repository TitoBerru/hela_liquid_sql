const path = require("path");
const fs = require("fs");
const recipesFilePath = path.join(__dirname, "../dataBase/recipesJson.json");
const flavorsFilePath = path.join(__dirname, "../dataBase/flavorsJson.json");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");
const sortJSON=require("./../xtras/sort")
let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
let flavors = JSON.parse(fs.readFileSync(flavorsFilePath, "utf-8"));
let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));


const indexController = {
    
    
    'index' : function (req, res){
        let recipes = JSON.parse(fs.readFileSync(recipesFilePath, "utf-8"));
        recipes = sortJSON(recipes, 'name', 'asc');
        
        //console.log('console.log de linea 19 de index: '+ cmv[cmv.length-1].customer);
        
        // cmvorder = sortJSON(cmv, 'createdAt', 'desc'); //order by
        cmvorder = [cmv.at(-1)] // Envio solo el ultimo elemento
        res.render('index', { recipes: recipes, cmv:cmvorder });
        
    }

};

module.exports = indexController;