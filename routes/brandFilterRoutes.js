const router = require("express").Router();
const Products = require("../models/Product");

router.get('/adidas', async (req, res) => {
    try {
      const query = {brand: 'Adidas'};
      const toReturn = {id: 1, name: 1, price: 1, stockAmount: 1}
      
      const adidasProducts = await Products.find(query, toReturn).exec();
      if(adidasProducts.length === 0) {
        res.status(200).json({message: `Não existem produtos em promoção.`})
      } else {
        res.status(200).json(adidasProducts);
      }
    } catch (error) {
      res.status(500).json({ error: error });
          return
    }
  });

  module.exports = router;