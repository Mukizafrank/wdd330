import { getLocalStorage, formDataToJSON } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const subtotalElement = document.querySelector(
            this.outputSelector + ' #subtotal'
        );
        const numItemsElement = document.querySelector(this.outputSelector + ' #num-items');

        if (numItemsElement) {
            numItemsElement.innerText = this.list.length;
        }

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

        if (subtotalElement) {
            subtotalElement.innerText = '$' + this.itemTotal.toFixed(2);
        }
    }

    calculateOrdertotal() {
        if (this.list.length > 0) {
            this.shipping = 10 + (this.list.length - 1) * 2;
        } else {
            this.shipping = 0;
        }
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shippingElement = document.querySelector(this.outputSelector + ' #shipping');
        const taxElement = document.querySelector(this.outputSelector + ' #tax');
        const orderTotalElement = document.querySelector(
            this.outputSelector + ' #orderTotal'
        );

        if (shippingElement) shippingElement.innerText = '$' + this.shipping;
        if (taxElement) taxElement.innerText = '$' + this.tax;
        if (orderTotalElement) orderTotalElement.innerText = '$' + this.orderTotal;
    }

    async checkout(form) {
        const json = formDataToJSON(form);
        // add totals, and item list to the object
        json.orderDate = new Date().toISOString();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        console.log(json);
        try {
            const res = await services.checkout(json);
            console.log(res);
            // next activity will handle success/failure
        } catch (err) {
            console.log(err);
        }
    }
}
