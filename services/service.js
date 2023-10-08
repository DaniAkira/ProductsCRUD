const Products = require("../models/Product");

const findOneProduct = async (id) => {
  const productSearched = await Products.findOne({ _id: id });
  return productSearched;
};

const findAllProducts = async () => {
  const allProducts = await Products.find();
  return allProducts;
};

const filterProductsByBrands = async (brands) => {
  let searchedProducts = [];
  if (typeof brands === "string") {
    const query = { brand: brands };
    const toReturn = { id: 1, name: 1, price: 1, stockAmount: 1 };

    try {
      searchedProducts = await Products.find(query, toReturn);
      return searchedProducts.length === 0 ? false : searchedProducts;
    } catch (error) {
      console.log(error)
      return false
    }
  } else {
    for(let i = 0; i < brands.length; i++) {
      const query = { brand: brands };
      const toReturn = { id: 1, name: 1, price: 1, stockAmount: 1 };

      try {
        const allProductsOfOneBrand = await Products.find(query, toReturn);
        searchedProducts.push(...allProductsOfOneBrand);

        return searchedProducts.length < 0 ? false : searchedProducts;
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
};

const searchProductsDependingOnFilter = async (query) => {
  const toReturn = {id: 1, name: 1, price: 1, stockAmount: 1};
  try {
    const foundProducts = await Products.find(
      query,
      toReturn
    )
    return foundProducts;
  } catch (error) {
    console.log(error);
    return false
  }
};

const createOneProduct = async (product) => {
  try {
    await Products.create(product);
    return product
  } catch (error) {
    console.log(error);
    return false
  }
};

const deleteOneProduct = async (id) => {
  try {
    await Products.deleteOne({ _id: id });
    
    return true
  } catch (error) {
    console.log(error);
    return false
  }
};

const updateOneProduct = async (id, editedProduct) => {
  let updatedProduct = {};
  await Products.updateOne({ _id: id }, editedProduct);
  updatedProduct = await Products.findOne({ _id: id });
  return updatedProduct;
};

module.exports = {
  findOneProduct,
  findAllProducts,
  createOneProduct,
  deleteOneProduct,
  updateOneProduct,
  filterProductsByBrands,
  searchProductsDependingOnFilter,
};
