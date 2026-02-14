// src/public/js/product-listing.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

// Load header and footer
loadHeaderFooter();

// Get category from URL parameter
const category = getParam('category');

// Update page title with category
if (category) {
    const categoryName = document.getElementById('category-name');
    if (categoryName) {
        // Format category name (e.g., "sleeping-bags" -> "Sleeping Bags")
        const formattedCategory = category.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        categoryName.textContent = formattedCategory;
    }
}

// Initialize product listing
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();