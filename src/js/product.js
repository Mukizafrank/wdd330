import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from './utils.mjs';

// Get product ID from URL
const productId = getParam("product");

// Create data source
const dataSource = new ExternalServices();

// Create and initialize product details
const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();
