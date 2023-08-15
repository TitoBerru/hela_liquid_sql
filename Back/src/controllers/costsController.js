
const costController = {

  index: function(req, res){
    res.render('costs')
  },

  allCosts: function(req, res){
    res.send('llego por AllCost')
  },
    
  calculate:  function (req, res) {
  
    res.render('index');

  },
  costoVenta: function(req,res){
    res.send('hola')
  }
 

 
};

module.exports = costController;