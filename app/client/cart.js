class cart {
    constructor() {
        this.products = [];
        this.menus = [];
        this.updateCart = null;
    }

    getTotal() {
        return this.products.length + this.menus.length;
    }

    addProduct(productID) {
        this.products.push(productID);
        if (this.updateCart) {
            this.updateCart();
        }
    }

    removeProduct(productID) {
        if (this.products.indexOf(productID) < 0) {
            return;
        }

        this.products.splice(this.products.lastIndexOf(productID), 1);
        if (this.updateCart) {
            this.updateCart();
        }
    }

    addMenu(menuID) {
        this.menus.push(menuID);
        if (this.updateCart) {
            this.updateCart();
        }
    }

    removeMenu(menuID) {
        if (this.menus.indexOf(menuID) < 0) {
            return;
        }

        this.menus.splice(this.menus.lastIndexOf(menuID), 1);
        if (this.updateCart) {
            this.updateCart();
        }
    }
}

export default new cart;