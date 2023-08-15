const path = require("path");
const fs = require("fs");
const salesFilePath = path.join(__dirname, "../dataBase/salesJson.json");


let resultado = [];
let recipesAcum = {
  acumByRecipe: (recipeid) => {
    let sales = JSON.parse(fs.readFileSync(salesFilePath, "utf-8"));

    resultado = sales.filter((sales) => sales.recipe == recipeid);
    resultadoEnCantidades = resultado.length;

    resultado.forEach((element) => {
      resultadobyrecipes = {
        recipe: element.recipe,
        cant: Number(element.ml) * Number(element.quantity),
      };
    });

    console.log("console, linea 25 de recipsAcum", resultadobyrecipes);
    return resultadoEnCantidades;
  },

  calculateRecipeTotals: (data) => {
    const recipeTotals = {};
    data.forEach((item) => {
      const recipe = item.recipe;
      const ml = parseFloat(item.ml);
      const quantity = parseInt(item.quantity);

      if (!isNaN(ml) && !isNaN(quantity)) {
        if (recipeTotals.hasOwnProperty(recipe)) {
          recipeTotals[recipe] += ml * quantity;
        } else {
          recipeTotals[recipe] = ml * quantity;
        }
      }
    });
    const recipeTotalsArray = [];
    for (const recipe in recipeTotals) {
      recipeTotalsArray.push({ recipe: recipe, total: recipeTotals[recipe] });
    }
    return recipeTotalsArray;
  },
};
module.exports = recipesAcum;
