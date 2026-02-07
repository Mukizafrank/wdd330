import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  
  async init() {
    // 1. Get product data
    this.product = await this.dataSource.findProductById(this.productId);
    
    // 2. Render product details
    this.renderProductDetails();
    
    // 3. Add cart event listener
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  
  addToCart() {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    
    // Optional: Show confirmation
    alert(`Added "${this.product.Name}" to cart!`);
  }
  
  renderProductDetails() {
    // Update page title
    document.title = `${this.product.Name} | Sleep Outside`;
    
    // Update brand
    const brandElement = document.getElementById('productBrand');
    if (brandElement && this.product.Brand) {
      brandElement.textContent = this.product.Brand.Name;
    }
    
    // Update product name
    const nameElement = document.getElementById('productName');
    if (nameElement) {
      nameElement.textContent = this.product.Name;
    }
    
    // Update image
    const imgElement = document.getElementById('productImage');
    if (imgElement) {
      imgElement.src = this.product.Image;
      imgElement.alt = this.product.Name;
    }
    
    // Update price
    const priceElement = document.getElementById('productPrice');
    if (priceElement) {
      priceElement.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    }
    
    // Update color
    const colorElement = document.getElementById('productColor');
    if (colorElement && this.product.Colors && this.product.Colors.length > 0) {
      colorElement.textContent = this.product.Colors[0].ColorName;
    }
    
    // Update description
    const descElement = document.getElementById('productDescription');
    if (descElement) {
      descElement.innerHTML = this.product.DescriptionHtmlSimple;
    }
    
    // Update cart button data-id
    const addButton = document.getElementById('addToCart');
    if (addButton) {
      addButton.dataset.id = this.product.Id;
    }
  }
}