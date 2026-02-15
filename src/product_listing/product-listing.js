import ExternalServices from '../js/ExternalServices.mjs';
import ProductList from '../js/ProductList.mjs';
import { loadHeaderFooter, getParam } from '../js/utils.mjs';

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
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();