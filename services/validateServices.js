const Products = require('../models/Product');

const validateIfProductExists = async (id) => {
  try {
    const targetProduct = await Products.findOne({ _id: id });
    return targetProduct ? true : false;
  } catch (error) {
    return false;
  }
};

const validateProductDataToUpdate = async (id, editedProduct) => {
  const targetProduct = await Products.findOne({ _id: id });
  if (
    targetProduct.name === editedProduct.name &&
    targetProduct.price === editedProduct.price &&
    targetProduct.size === editedProduct.size &&
    targetProduct.stockAmount === editedProduct.stockAmount &&
    targetProduct.brand === editedProduct.brand &&
    targetProduct.type === editedProduct.type &&
    targetProduct.sale === editedProduct.sale
  ) {
    return false;
  } else return true;
};


module.exports = {
  validateProductDataToUpdate,
  validateIfProductExists,
};