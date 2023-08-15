

const salesController = {
  list: function (req, res) {
    //    res.send({status: "ok", nombre:'hola'});
    res.render("sales");
  },
  customer: function (req, res) {
    res.render("sales");
    // res.render('sales')
  },
  month: function (req, res) {
    
    res.render("./Sales/salesForMonth");
    // res.send({ result });
  },

  year: function (req, res) {
    res.send("llego por year");
    // res.render('sales')
  },
  recipe: function (req, res) {
    
    res.render("./Sales/salesForRecipe");
  },
  flavor: function (req, res) {
    res.send("llego por flavor");
    // res.render('sales')
  },
};

module.exports = salesController;
