const router = require("express").Router();
const Products = require("../models/Product");



  router.get('/', async (req, res) => {
    const brands = req.query.brand;
    let searchedProducts = [];
    let allProductsOfOneBrand = [];
    if(brands.length === 0) {
      res.status(200).json({message: `Selecione uma marca para buscar.`})
    } else if(typeof brands === 'string') {
        const query = {brand: brands};
        const toReturn = {id: 1, name: 1, price: 1, stockAmount: 1};

        try {
          searchedProducts = await Products.find(query, toReturn);
          if(searchedProducts.length < 0) {
            res.status(200).json({message: 'Não foram encontrados produtos.'})
          } else {
            res.status(200).json(searchedProducts);
          }
        } catch (error) {
          res.status(500).json({ error: error });
          return
        }
    } else if (brands.length > 1) {
      for(let i = 0; i < brands.length; i++) {
        const query = {brand: brands[i]};
        const toReturn = {id: 1, name: 1, price: 1, stockAmount: 1};
        try {
          allProductsOfOneBrand = await Products.find(query, toReturn);
          searchedProducts.push(...allProductsOfOneBrand);
        } catch (error) {
          res.status(500).json({ error: error });
          return
        }
      }
      if(searchedProducts.length < 0) {
        res.status(200).json({message: 'Não foram encontrados produtos.'})
      }
      res.status(200).json(searchedProducts);
    }
  });
  

  module.exports = router;