

const recipesController = {
  list: function (req, res) {
   
    res.render("./recipe/recipes");
  },
  create: function (req, res) {
    
    res.render("./recipe/create");
  },
  search: function (req, res) {

    res.render("recipe/results");
  },
  edit: function (req, res) {
    
    res.render("./recipe/edit");
  },
  detail: function(req, res){
    res.render("recipe/recipeDetail");
    // res.send('llgo por detail')
  },
  storeRecipe: function (req, res) {

    res.redirect("/recipes");
  },

  

  updateRecipe: function (req, res) {
    res.redirect("/recipes");
  },

  deleteRecipe: function (req, res) {

    res.redirect("/recipes");
  },
};

module.exports = recipesController;
