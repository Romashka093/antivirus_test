'use strict';
import { discountIcon, downloadIcon, arrowUp, arrowDown } from './icons.js';

const refs = {
  productList: document.querySelector('.product__list'),
  main: document.querySelector('.wrapper'),
};

class ProductGrid {
  constructor() {
    this.items = [];

    Object.assign(this, refs);

    this.init();
  }
  init() {
    this.fetchItems();
  }
  createGrid(item) {
    const { amount, license_name, name_prod, price_key, is_best, link } = item;
    const isBestValue = is_best;
    const isDiscount = price_key === '50%';
    const amountLable = license_name.toLowerCase().includes('monthly')
      ? 'mo'
      : 'per year';

    return `<li class="product__list-item">
  <div class="item_amount">
  ${isBestValue ? `<span class="item_amount_best">Best value</span>` : ``}
    ${
      isDiscount
        ? `<span class="item_amount_discount">${discountIcon}</span>`
        : ``
    }
    <p class="item_price">
      $${amount}<span class="item_price_description">/${amountLable}</span>
    </p>
    ${isDiscount ? `<p class='item_price_no_discount'>$${amount * 2}</p>` : ``}
  </div>
  <div class="item_heading">
    <h3 class="item_heading_name">${name_prod}</h3>
    <p class="item_heading_decsription">${license_name}</p>
    <a class="item_heading_button" href="${link}">
      <span class="item_heading_button_content"
        >download${downloadIcon}</span>
    </a>
  </div>
</li>`;
  }

  fetchItems() {
    fetch('https://veryfast.io/t/front_test_api.php')
      .then(res => res.json())
      .then(data => {
        data?.result?.elements?.forEach(item => {
          this.items += this.createGrid(item);
        });

        this.productList.insertAdjacentHTML('beforeend', this.items);
        this.productList.addEventListener('click', event =>
          this.showArrow(event.target),
        );
      })
      .catch(error => console.error(error));
  }

  showArrow(item) {
    if (window.innerWidth < 768) return;

    if (item.classList.contains('item_heading_button_content')) {
      const arrow = document.createElement('div');
      arrow.className = 'arrow';
      if (window.navigator.userAgent.includes('Chrome')) {
        arrow.style.setProperty('top', '50px');
        arrow.style.setProperty('right', '80px');
        arrow.style.setProperty('animation-name', 'arrowUp');
        arrow.innerHTML = arrowUp;
        this.main.append(arrow);
        setTimeout(() => {
          arrow.remove();
        }, 23300);
      } else {
        arrow.style.setProperty('bottom', '60px');
        arrow.style.setProperty('left', '80px');
        arrow.style.setProperty('animation-name', 'arrowDown');
        arrow.innerHTML = arrowDown;
        this.main.append(arrow);
        setTimeout(() => {
          arrow.remove();
        }, 23300);
      }
    }
  }
}
new ProductGrid();
