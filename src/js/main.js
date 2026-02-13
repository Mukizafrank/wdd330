// main.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';


// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Get the product list container
  const productListElement = document.querySelector('.product-list');
  
  // Create data source instance
  const dataSource = new ProductData('tents');
  
  // Create and initialize product list
  const productList = new ProductList(
    null, // no category filter
    dataSource,
    productListElement
  );
  
  await productList.init();
  
  console.log('Product list loaded successfully');
});

loadHeaderFooter();