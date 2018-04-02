import { EventRegister as Event } from 'react-native-event-listeners';

class cart {
    constructor() {
        this.products = [];
        this.menus = [];
        this.listeners = [];

        this.productsQuantity = {};
        this.selections = [];

        this.cart_id = 0;
    }

    getQuantityForProductId(id) {
        return this.productsQuantity.id || 0;
    }

    getQuantityForMenuId(id) {
        return this.selections.filter(selection => selection.menu.id === id).length;
    }

    getTotalNumberOfProducts() {
        let result = 0;
        Object.keys(this.productsQuantity).forEach(key => {
            result += this.productsQuantity[key];
        });
        return result;
    }

    getTotalNumberOfMenus() {
        return this.selections.length;
    }

    getTotal() {
        return (this.getTotalNumberOfMenus() + this.getTotalNumberOfProducts());
    }

    addProduct(product) {
        this.productsQuantity[product.id] = (this.productsQuantity[product.id] || 0) + 1;
        this.notifyListeners();
    }

    removeProduct(product) {
        if (this.productsQuantity.hasOwnProperty(product.id)) {
            this.productsQuantity[product.id] = Math.max(0, this.productsQuantity[product.id] - 1);
            this.notifyListeners();
        }
    }

    addSelection(selection) {
        if (selection.hasOwnProperty('cart_id')) {
            return;
        }
        selection.cart_id = this.cart_id++;
        this.selections.push(selection);
        this.notifyListeners();
    }

    updateSelection(selection) {
        if (selection.hasOwnProperty('cart_id')) {
            const res = this.selections.find(el => el.cart_id === selection.cart_id);
            if (res) {
                this.selections[this.selections.indexOf(res)] = selection;
            }
        }
    }

    removeSelection(selection) {
        if (selection.hasOwnProperty('cart_id')) {
            const res = this.selections.find(el => el.cart_id === selection.cart_id);
            if (res) {
                this.selections.splice(this.selections.indexOf(res), 1);
                this.notifyListeners();
            }
        }
    }

    removeAll() {
        this.productsQuantity = {};
        this.selections = [];
        this.notifyListeners();
    }

    notifyListeners() {
        Event.emit('cartUpdate');
    }
}

export default new cart;