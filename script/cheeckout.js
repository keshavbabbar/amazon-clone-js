import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js'
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOption } from '../data/deliveryItem.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    let productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
     <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
             ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" 
                data-product-id = '${matchingProduct.id}'>
                Update
                </span>
               <input class = 'quantity-input js-quantity-input-${matchingProduct.id}'>
                <span class = 'save-quantity-link link-primary js-save-link'
                data-product-id = '${matchingProduct.id}'>Save</span>

                <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id = '${matchingProduct.id}'>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
        ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
        </div>
     </div>`;
})

function deliveryOptionHTML(matchingProduct, cartItem) {

    let html = ''

    deliveryOption.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days')

        const deliveryString = deliveryDate.format('dddd, MMMM D')

       const priceString = option.priceCents === 0 ? 'Free' : `$${formatCurrency(option.priceCents)}`;
       const isChecked = option.id === cartItem.deliveryOptionId 
 
        html += `
            <div class="delivery-option">
            <input type="radio"
           ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
               ${deliveryString}
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
            </div>
        </div>
         `
    });

    return html;
}

document.querySelector('.js-order-Summary').innerHTML = cartSummaryHTML

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove()
            updateCartQuantity()
        });
    });


function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add(`is-editing-quantity`)
        })
    });

document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity')

            const quantity = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantity.value);

            updateQuantity(productId, newQuantity);

            const quantitylabel = document.querySelector(`.js-quantity-label-${productId}`)

            quantitylabel.innerHTML = newQuantity;


            updateCartQuantity();
        });
    });
