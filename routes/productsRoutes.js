const router = require("express").Router();
const {
  validateProductDataToUpdate,
  validateIfProductExists,
} = require("../services/validateServices");

const {
  findOneProduct,
  findAllProducts,
  createOneProduct,
  deleteOneProduct,
  updateOneProduct,
} = require("../services/service");

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

  if (!(await validateIfProductExists(id))) {
    res.status(422).json({ message: `Produto não encontrado.` });
  } else {
    const targetRecord = await findOneProduct(id);
    res.status(200).json(targetRecord);
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

    const productCreated = await createOneProduct(product);

    if(!productCreated) {
      res.status(500).json({message: `Erro ao registrar produto`});
    }else {
      res.status(201).json({ mensagem: `Produto registrado com sucesso!` });
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

  if (await validateIfProductExists(productId)) {
    if (!(await validateProductDataToUpdate(productId, editedProduct))) {
      res
        .status(400)
        .json({ error: "Produto não foi alterado, parâmetros iguais." });
    } else {
      const updatedProduct = await updateOneProduct(productId, editedProduct);

      res.status(200).json(updatedProduct);
    }
  } else {
    res.status(422).json({ error: "Produto não foi encontrado!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!(await validateIfProductExists(id))) {
    res.status(422).json({ message: `Produto não encontrado.` });
  } else {
    const deletedProduct = await deleteOneProduct(id);

    if(deletedProduct) {
      res.status(200).json({ message: `Produto removido com sucesso.` });
    } else {
      res.status(500).json({message: `Erro ao deletar produto`});
    }

  }
});

module.exports = router;
