
let db = require('../../database/models')

const indexController = {
    
    
    'index' : function (req, res){

        db.Stock.findAll()
    .then(function(aroma){
      res.send(aroma);
      // res.send(aroma)
    }
    )




        // res.send('llego por index')
        
    }

};

module.exports = indexController;