
const usersController = {
    index: function (req, res) {
        // res.send('llego por index')
        res.render("./users/login");
    },

    register: function (req, res){
        res.render('./users/register')
    },
    storeUser: function (req, res) {
      
        res.redirect("/");
      }
  };
  
  
  module.exports = usersController;