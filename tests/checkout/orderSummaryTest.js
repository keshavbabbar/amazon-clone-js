import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage, cart, addToCart, removeFromCart} from "../../data/cart.js";
import { loadProducts, loadProductsFetch} from "../../data/products.js";

describe("test suite: renderOrdeSummary", () => {
    const productid1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productid2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


beforeAll((done) => {
    loadProductsFetch().then(() => {
        done()
    });
})


    beforeEach(() => {
        spyOn(localStorage, 'setItem')

        document.querySelector(".js-test-container").innerHTML = `
           <div class="js-order-summary"> </div>
           <div class="js-checkout-header"></div>
           <div class="js-payment-summary"></div>`;

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{
                productId: productid1,
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: productid2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage();

        renderOrderSummary()
    })

    afterEach(() => {
        document.querySelector(".js-test-container").innerHTML = '';
    })

    it("displays the cart", () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productid1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productid2}`).innerText
        ).toContain('Quantity: 1')

        expect(
            document.querySelector(`.js-product-name-${productid1}`).innerText
        ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs')

        expect(
            document.querySelector(`.js-product-name-${productid2}`).innerText
        ).toEqual('Intermediate Size Basketball')

        expect(
            document.querySelector(`.js-product-price-${productid1}`).innerText
        ).toEqual('$10.90');

        expect(
            document.querySelector(`.js-product-price-${productid2}`).innerText
        ).toEqual('$20.95');
    });


    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productid1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productid1}`)
        ).toEqual(null)

        expect(
            document.querySelector(`.js-cart-item-container-${productid2}`)
        ).not.toEqual(null);

        expect(
            document.querySelector(`.js-product-name-${productid2}`).innerText
        ).toEqual('Intermediate Size Basketball');

        expect(
            document.querySelector(`.js-product-price-${productid2}`).innerText
        ).toEqual('$20.95');

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productid2);
    })


    it('updates the delivery option', () => {
        document.querySelector(`.js-delivery-option-${productid1}-3`).click();

        expect(
            document.querySelector(`.js-delivery-option-input-${productid1}-3`).checked
        ).toEqual(true);

        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productid1);
        expect(cart[0].deliveryOptionId).toEqual('3');

        expect(
            document.querySelector('.js-payment-summary-shipping').innerText
        ).toEqual('$14.98');
        expect(
            document.querySelector('.js-payment-summary-total').innerText
        ).toEqual('$63.50');
    });
});

