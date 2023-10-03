const validateUpdateProductsData = (
  targetProductName,
  targetProductPrice,
  targetProductSize,
  targetProductStockAmount,
  targetProductBrand,
  targetProductType,
  targetProductSale,
  editedProductName,
  editedProductPrice,
  editedProductSize,
  editedProductStockAmount,
  editedProductBrand,
  editedProductType,
  editedProductSale
) => {
    if(
        targetProductName === editedProductName &&
        targetProductPrice === editedProductPrice &&
        targetProductSize === editedProductSize &&
        targetProductStockAmount === editedProductStockAmount &&
        targetProductBrand === editedProductBrand &&
        targetProductType === editedProductType &&
        targetProductSale === editedProductSale) {
            return false
        } else return true
};


module.exports = validateUpdateProductsData;