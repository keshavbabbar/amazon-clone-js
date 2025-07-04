import {
    cart,
    removeFromCart,
    calculateCartQuantity,
    updateQuantity,
    updateDeliveryOption
} from '../../data/cart.js'

import { products, getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryItem.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        let productId = cartItem.productId;

        const matchingProduct = getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId)

        const deliveryString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                     ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" 
                    data-product-id = '${matchingProduct.id}'>
                    Update
                    </span>
                <input class ='quantity-input js-quantity-input-${matchingProduct.id}'>
                    <span class = 'save-quantity-link link-primary js-save-link'
                    data-product-id = '${matchingProduct.id}'>Save</span>

                    <span class="delete-quantity-link link-primary js-delete-link
                      js-delete-link-${matchingProduct.id}" 
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

        deliveryOptions.forEach((option) => {
            const deliveryString = calculateDeliveryDate(option);

            const priceString = option.priceCents === 0 ? 'Free' : `$${formatCurrency(option.priceCents)}`;
            const isChecked = option.id === cartItem.deliveryOptionId

            html += `
                <div class="delivery-option js-delivery-option
                  js-delivery-option-${matchingProduct.id}-${option.id}"
                data-product-id = "${matchingProduct.id}"
                data-delivery-option-id = "${option.id}">
                <input type="radio"
            ${isChecked ? 'checked' : ''}
                 class="delivery-option-input
                 js-delivery-option-input-${matchingProduct.id}-${option.id}"

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

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                const container = document.querySelector(`.js-cart-item-container-${productId}`)
                container.remove();


                renderCheckoutHeader();
                updateCartQuantity();
                renderPaymentSummary();
            });
        });


    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        const returnToHomeLink = document.querySelector('.js-return-to-home-link');

        if (returnToHomeLink) {
            returnToHomeLink.innerHTML = `${cartQuantity} items`;
        }
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
                renderPaymentSummary();
            });
        });


    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        })
}