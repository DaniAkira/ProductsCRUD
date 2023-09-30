const router = require("express").Router();
const Products = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const allRecords = await Products.find();

    res.status(200).json(allRecords);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const { name, price, size, stockAmount, brand, type, sale } = req.body;

  if(!name || !price || brand) {
    res.status(422).json({error: `Nome, preço e marca são obrigatórios para cadastro de produto.`});
  }else {
    const product = {
        name,
        price,
        size,
        stockAmount,
        brand,
        type,
        sale,
    };

    try {
        await Products.create(product);

        res.status(201).json({mensagem: `Produto registrado com sucesso!`}),json(product);
    } catch (error) {
        res.status(500).json({ error: error });
    }
  }
});
