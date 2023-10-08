const router = require("express").Router();
const { searchProductsDependingOnFilter } = require("../services/service");

router.get("/sales", async (req, res) => {
  const query = { sale: true };

  const salesProducts = await searchProductsDependingOnFilter(query);
  if (!salesProducts) {
    res.status(200).json({ message: `Não existem produtos em promoção.` });
  } else {
    res.status(200).json(salesProducts);
  }
});

router.get("/tshirts", async (req, res) => {
  const query = { type: "Camisetas" };

  const tshirtProducts = await searchProductsDependingOnFilter(query);
  if (!tshirtProducts) {
    res.status(200).json({ message: `Não foram encontradas camisetas.` });
  } else {
    res.status(200).json(tshirtProducts);
  }
});

router.get("/shorts", async (req, res) => {
  const query = { type: "Shorts" };

  const shortsProducts = await searchProductsDependingOnFilter(query);
  if (!shortsProducts) {
    res.status(200).json({ message: `Não foram encontrados Shorts.` });
  } else {
    res.status(200).json(shortsProducts);
  }
});

router.get("/jackets", async (req, res) => {
  const query = {type: "Jaquetas e agasalhos"};

  const jacketsProducts = await searchProductsDependingOnFilter(query);
  if(!jacketsProducts) {
    res.status(200).json({ message: `Não foram encontrados Jaquetas e agasalhos.` });
  } else {
    res.status(200).json(jacketsProducts);
  }
})

module.exports = router;
