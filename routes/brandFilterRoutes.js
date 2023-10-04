const router = require("express").Router();

const {
  filterProductsByBrands,
} = require("../services/service");


router.get("/", async (req, res) => {
  const brands = req.query.brand;
  const searchedProducts = await filterProductsByBrands(brands);
  if (brands.length === 0) {
    res.status(200).json({ message: `Selecione uma marca para buscar.` });
  } else {
    if(!searchedProducts) {
      res.status(200).json({ message: "Não foram encontrados produtos." });
    } else {
      res.status(200).json(searchedProducts);
    }
  }
});

module.exports = router;
