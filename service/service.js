const Products = require('../models/Product');

const validateProductsData = async (id, editedProduct) => {
  try {
    const targetProduct = await Products.findOne({_id: id});
    console.log(`Target Product: ${targetProduct.price}`);
    console.log(`Edited Product: ${editedProduct}`);
    console.log(`Edited name: ${editedProduct.price}`);
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


module.exports = validateProductsData;