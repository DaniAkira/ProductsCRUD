const router = require("express").Router();
const Products = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const allRecords = await Products.find();

    res.status(200).json(allRecords);
  } catch (error) {
    res.status(500).json({ error: error });
    return
  }
});

router.post("/", async (req, res) => {
  const { name, price, size, stockAmount, brand, type, sale } = req.body;

  if(!name || !price || !brand) {
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

        res.status(201).json({mensagem: `Produto registrado com sucesso!`});
    } catch (error) {
        res.status(500).json({ error: error });
        return
    }
  }
});

router.patch('/:id', async (req, res) => {
  const productId = req.params.id;
  
  const { name, price, size, stockAmount, brand, type, sale } = req.body;

  try {
    
    const targetProduct = await Products.findOne({_id: productId});

    const editedProduct = {
          name,
          price,
          size,
          stockAmount,
          brand,
          type,
          sale,
    };
  
    if(targetProduct.name === editedProduct.name && 
      targetProduct.price === editedProduct.price &&
      targetProduct.size === editedProduct.size &&
      targetProduct.stockAmount === editedProduct.stockAmount &&
      targetProduct.brand === editedProduct.brand &&
      targetProduct.type === editedProduct.type &&
      targetProduct.sale === editedProduct.sale) {
        res.status(400).json({ error: "Produto não foi alterado, parâmetros iguais." });
      } else {
        try {
          
          const updatedProduct = await Products.updateOne({_id: productId}, editedProduct);

          if(updatedProduct.matchedCount === 0) {
            res.status(422).json({ error: "Peroduto não foi encontrado!" });
            return
          }
          res.status(200).json(editedProduct);
  
        } catch (error) {
          res.status(500).json({ error: error });
          return
        }
      }

  } catch (error) {
    res.status(422).json({ error: "Produto não encontrado" });
    return
  }


});


module.exports = router
