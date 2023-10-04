const Products = require("../models/Product");

const findOneProduct = async (id) => {
  const productSearched = await Products.findOne({ _id: id });
  return productSearched;
};

const findAllProducts = async () => {
  const allProducts = await Products.find();
  return allProducts;
};

const createOneProduct = async (product) => {
  await Products.create(product);
};

const deleteOneProduct = async (id) => {
  await Products.deleteOne({ _id: id });
};

const updateOneProduct = async (id, editedProduct) => {
  let updatedProduct = {};
  await Products.updateOne({ _id: id }, editedProduct);
  updatedProduct = await Products.findOne({ _id: id });
  return updatedProduct;
};

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
  findOneProduct,
  findAllProducts,
  createOneProduct,
  deleteOneProduct,
  updateOneProduct,
};
