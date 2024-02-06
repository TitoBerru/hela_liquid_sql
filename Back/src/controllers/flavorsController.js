
const db = require('../../database/models')
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const optionsOrder = {where:{AromaActivo : 1},order: [['NombreAroma','ASC']]}
const quoteService = require('../services/quoteService')
const flavorsController = {
  allFlavors: async function (req, res) {
    // consulto al servicio quote para traer los valores del cambio oficial.
    const { valorDolarblue, valorDolarOf } = await quoteService.data();
    console.log('✅⛔✅ linea 11 flavors controller: valor dolar blue', valorDolarblue)
   

    await db.Aromas.findAll(optionsOrder).then(function (aroma) {
      const aromas2 = aroma.map((aroma) => {
        
        if (aroma.dataValues.Moneda == "USP") {
          // console.log('✅linea 14, flavors controller: ', valorDolarblue)
          return {
            ...aroma.dataValues,
            CostoUnitario: aroma.dataValues.CostoUnitario * valorDolarblue,
          };
        } else if (aroma.dataValues.Moneda == "USO") {
          // console.log('✅linea 22, flavors controller: ', aroma.dataValues)
          return {
            ...aroma.dataValues,
            CostoUnitario: aroma.dataValues.CostoUnitario * valorDolarOf,
          };
        } else {
          return {
            ...aroma.dataValues,
          };
        }
      });
      // console.log('✅linea 23, flavors controller: ', aromas2)

      // aroma.forEach(element => {
      //   if (element.dataValues.Moneda == 'USP'){
      //     console.log('✅Linea 13 flavorsController: ',element.dataValues)
      //     aroma.element = {
      //       ...element,
      //     CostoUnitario : dolarBlue
      //     }
      //     console.log('✅Linea 18 flavorsController: ',element.dataValues.CostoUnitario)
      //   }
      // });
      // res.send(aromas2)
      res.render("Flavors/flavors", { aroma: aromas2 });
    });
  },

  createFlavors: function (req, res) {
    res.render("Flavors/flavorCreate");
  },

  storeFlavors: async function (req, res) {
    await db.Aromas.create({
      NombreAroma: req.body.name,
      CantidadDisponible: req.body.stock,
      Proveedor: req.body.provider,
      CostoUnitario: req.body.price,
      Marca: req.body.brand,
      FechaRegistro: new Date(),
      AromaActivo: 1,
      Moneda: req.body.costType,
    });

    // res.send(req.body);
    res.redirect("/flavors");
  },

  search: async function (req, res) {
    const flavorFound = await db.Aromas.findAll({
      where: {
        [Op.or]: [
          {
            NombreAroma: {
              [Op.like]: `%${req.query.searchFlavor}%`,
            },
          },
          {
            Marca: {
              [Op.like]: `%${req.query.searchFlavor}%`,
            },
          },
        ],
        AromaActivo: 1,
      },
    });
    res.render("flavors/flavorResults", { flavorFound: flavorFound });
  },

  edit: async function (req, res) {
    await db.Aromas.findByPk(req.params.id).then(function (aroma) {
      // res.send(aroma)
      res.render("flavors/flavorEdit", { aroma });
    });
  },
  updateFlavor: async function (req, res) {
    let valorDolarblue = (await quoteService.data()).valorDolarblue;
    let valorDolarOf = (await quoteService.data()).valorDolarOf;
    // let costoUnitarioActualizado;
    // costoUnitarioActualizado = (req.body.costType === 'USP') ? req.body.price * valorDolarblue : costoUnitarioActualizado;
    // costoUnitarioActualizado = (req.body.costType === 'USO') ? req.body.price * valorDolarOf : costoUnitarioActualizado;
    // costoUnitarioActualizado = (req.body.costType === 'ARG') ? req.body.price : costoUnitarioActualizado;
    // console.log('✅linea 105 flavors controller', costoUnitarioActualizado)
    await db.Aromas.update(
      {
        NombreAroma: req.body.name,
        CantidadDisponible: req.body.stock,
        Proveedor: req.body.provider,
        CostoUnitario: req.body.price,
        Marca: req.body.brand,
        FechaRegistro: new Date(),
        AromaActivo: 1,
        Moneda: req.body.costType,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // res.send(req.body)
    res.redirect("/flavors");
  },

  deleteFlavor: async function (req, res) {
    await db.Aromas.update(
      { AromaActivo: 0 },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/flavors");
  },

  detail: async function (req, res) {
    await db.Aromas.findByPk(req.params.id).then(function (aroma) {
      res.render("flavors/flavorDetail", { aroma });
      // res.send(aroma)
    });
  },
};

module.exports = flavorsController;
