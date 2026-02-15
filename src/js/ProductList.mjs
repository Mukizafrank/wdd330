// ProductList.mjs
import { renderListWithTemplate } from './utils.mjs';

// Template function for product cards
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    <button class="quick-view-button" data-id="${product.Id}">Quick View</button>
  </li>`;
}

function modalTemplate(product) {
  return `<div class="modal-content">
    <span class="close-modal">&times;</span>
    <div class="product-detail">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" />
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <div class="product__description">${product.DescriptionHtmlSimple}</div>
    </div>
  </div>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Get the list of products
    const list = await this.dataSource.getData(this.category);

    // Render the list
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true
    );

    // Add event listeners for Quick View buttons
    this.listElement.querySelectorAll('.quick-view-button').forEach(button => {
      button.addEventListener('click', async (e) => {
        const productId = e.target.dataset.id;
        const product = await this.dataSource.findProductById(productId);
        this.showModal(product);
      });
    });
  }

  showModal(product) {
    let modal = document.querySelector('#product-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-modal';
      modal.className = 'modal';
      document.body.appendChild(modal);
    }
    modal.innerHTML = modalTemplate(product);
    modal.style.display = 'block';

    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}