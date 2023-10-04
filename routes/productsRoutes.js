const router = require("express").Router();
const Products = require("../models/Product");
const {
  validateProductsDataToUpdate,
  findOneProduct,
  findAllProducts,
  createProduct,
} = require("../service/service");

router.get("/", async (req, res) => {
  try {
    const allRecords = await findAllProducts();

    res.status(200).json(allRecords);
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const targetRecord = await findOneProduct(id);

    if (!targetRecord) {
      res.status(422).json({ message: `Produto não encontrado.` });
    } else {
      res.status(200).json(targetRecord);
    }
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

router.post("/", async (req, res) => {
  const { name, price, size, stockAmount, brand, type, sale } = req.body;

  if (!name || !price || !brand) {
    res.status(422).json({
      error: `Nome, preço e marca são obrigatórios para cadastro de produto.`,
    });
  } else {
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
      await createProduct(product);

      res.status(201).json({ mensagem: `Produto registrado com sucesso!` });
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }
});

router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price, size, stockAmount, brand, type, sale } = req.body;
  const editedProduct = {
    name,
    price,
    size,
    stockAmount,
    brand,
    type,
    sale,
  };

  try {
    if (!(await validateProductsDataToUpdate(productId, editedProduct))) {
      res
        .status(400)
        .json({ error: "Produto não foi alterado, parâmetros iguais." });
    } else {
      try {
        const updatedProduct = await Products.updateOne(
          { _id: productId },
          editedProduct
        );

        if (updatedProduct.matchedCount === 0) {
          res.status(422).json({ error: "Peroduto não foi encontrado!" });
          return;
        }
        res.status(200).json(editedProduct);
      } catch (error) {
        res.status(500).json({ error: error });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const targetRecord = await findOneProduct(id);

    if (!targetRecord) {
      res.status(422).json({ message: `Produto não encontrado.` });
    } else {
      try {
        await Products.deleteOne({ _id: id });

        res.status(200).json({ message: `Produto removido com sucesso.` });
      } catch (error) {
        res.status(500).json({ error: error });
        return;
      }
    }
  } catch (error) {
    res.status(422).json({ message: `Produto não encontrado.` });
    return;
  }
});

module.exports = router;
