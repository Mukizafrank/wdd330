import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './shoppingcart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');
cart.init();