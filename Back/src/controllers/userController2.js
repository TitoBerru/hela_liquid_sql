const path = require("path");
const fs = require("fs");
const productsFilePath = path.join(__dirname, "../dataBase/usersJson.json");
let users = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const usersController = {
    index: function (req, res) {
        // res.send('llego por index')
        res.render("./users/login");
    },

    register: function (req, res){
        res.render('./users/register')
    },
    storeUser: function (req, res) {
        function uid() {
          return Math.random().toString(36) + Date.now().toString(36);
        }
    
        let newUser = {
          idUser: uid(),
          userName: req.body.username,
          password: req.body.password,
          email: req.body.email,
          phone: req.body.phone,
          avatar: ""
        };
        // Leer que habia
        let usersStorage = fs.readFileSync("./src/database/usersJson.json", {
          encoding: "utf-8",
        }); //leo el archivo
        let jsonUsersStorage;
        if (usersStorage == "") {
          //valido si esta vacio
          jsonUsersStorage = []; //si esta vacio dejo un array vacio
        } else {
          jsonUsersStorage = JSON.parse(usersStorage); // sino es vacio lo parseo a json
        }
    
        jsonUsersStorage.push(newUser); // ahi subo la nueva receta
        jsonUsersStorageJson = JSON.stringify(jsonUsersStorage); // vuelvo a JSON
        fs.writeFileSync("./src/database/usersJson.json", jsonUsersStorageJson); //SobreEscribo el archivo 
        res.redirect("/");
      }
  };
  
  
  module.exports = usersController;