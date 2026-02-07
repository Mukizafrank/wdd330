import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

// Get product ID from URL
const productId = getParam("product");

// Create data source
const dataSource = new ProductData("tents");

// Create and initialize product details
const product = new ProductDetails(productId, dataSource);
product.init();
