const Products = require('../models/Product');

const findOneProduct = async (id) => {
  const productSearched = await Products.findOne({_id: id});
  return productSearched;
};

const validateProductsDataToUpdate = async (id, editedProduct) => {
  try {
    const targetProduct = await Products.findOne({_id: id});
    if(
      targetProduct.name !== editedProduct.name ||
      targetProduct.price !== editedProduct.price ||
      targetProduct.size !== editedProduct.size ||
      targetProduct.stockAmount !== editedProduct.stockAmount ||
      targetProduct.brand !== editedProduct.brand ||
      targetProduct.type !== editedProduct.type ||
      targetProduct.sale !== editedProduct.sale) {
        return true;
      } else return false;
  } catch (error) {
     console.log(error);
        return;
  }
};


module.exports = { validateProductsDataToUpdate, findOneProduct };