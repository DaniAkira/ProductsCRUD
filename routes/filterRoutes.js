const router = require("express").Router();
const Products = require("../models/Product");

router.get('/sales', async (req, res) => {
    try {
      const query = {sale: true};
      const toReturn = {id: 1, name: 1, price: 1, stockAmount: 1}
      
      const salesProducts = await Products.find(query, toReturn).exec();
      if(salesProducts.length === 0) {
        res.status(200).json({message: `Não existem produtos em promoção.`})
      } else {
        res.status(200).json(salesProducts);
      }
    } catch (error) {
      res.status(500).json({ error: error });
          return
    }
  });
  
  router.get('/tshirts', async (req, res) => {
    try {
      const query = {type: "Camisetas"};
      const toReturn = {_id: 1, name: 1, price: 1, stockAmount: 1, type: 1}
      
      const tshirtProducts = await Products.find(query, toReturn).exec();
      if(tshirtProducts.length === 0) {
        res.status(200).json({message: `Não foram encontradas camisetas.`})
      } else {
        res.status(200).json(tshirtProducts);
      }
    } catch (error) {
      res.status(500).json({ error: error });
          return
    }
  });
  
  router.get('/shorts', async (req, res) => {
    try {
      const query = {type: "Shorts"};
      const toReturn = {_id: 1, name: 1, price: 1, stockAmount: 1, type: 1}
      
      const shortsProducts = await Products.find(query, toReturn).exec();
      if(shortsProducts.length === 0) {
        res.status(200).json({message: `Não foram encontrados Shorts.`})
      } else {
        res.status(200).json(shortsProducts);
      }
    } catch (error) {
      res.status(500).json({ error: error });
          return
    }
  });

  module.exports = router;