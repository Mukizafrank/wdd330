// ShoppingCart.mjs
import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0]?.ColorName || 'N/A'}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parent = document.querySelector(parentSelector);
  }

  async init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCartContents(cartItems);
  }

  renderCartContents(cartItems) {
    if (cartItems.length === 0) {
      this.parent.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
      renderListWithTemplate(cartItemTemplate, this.parent, cartItems, 'afterbegin', true);
      
      // Calculate and display total
      const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
      this.displayCartTotal(total);
    }
  }

  displayCartTotal(total) {
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
      totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  }
}