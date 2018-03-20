class cart {
    constructor() {
        this.productsQuantity = {};
        this.menusQuantity = {};
        this.products = [];
        this.menus = [];
        this.listeners = [];
    }

    getQuantityForProductID(productID) {
        return this.productsQuantity[productID] || 0;
    }

    getQuantityForMenuID(menuID) {
        return this.menusQuantity[menuID] || 0;
    }

    getTotalNumberOfProducts() {
        let result = 0;
        this.products.forEach(product => {
            result += this.getQuantityForProductID(product.id);
        });
        return result;
    }

    getTotalNumberOfMenus() {
        let result = 0;
        this.menus.forEach(menu => {
            result += this.getQuantityForMenuID(menu.id);
        });
        return result;
    }

    getTotal() {
        return (this.getTotalNumberOfMenus() + this.getTotalNumberOfProducts());
    }

    addProduct(productID) {
        const currentValue = this.getQuantityForProductID(productID);
        this.productsQuantity[productID] = currentValue + 1;

        this.listeners.forEach(listener => {
            listener();
        });
    }

    removeProduct(productID) {
        const currentValue = this.getQuantityForProductID(productID);
        this.productsQuantity[productID] = Math.max(0, currentValue - 1);

        this.listeners.forEach(listener => {
            listener();
        });
    }

    addMenu(menuID) {
        const currentValue = this.getQuantityForMenuID(menuID);
        this.menusQuantity[menuID] = currentValue + 1;
        
        this.listeners.forEach(listener => {
            listener();
        });
    }

    removeMenu(menuID) {
        const currentValue = this.getQuantityForMenuID(menuID);
        this.menusQuantity[menuID] = Math.max(0, currentValue - 1);
        
        this.listeners.forEach(listener => {
            listener();
        });
    }
}

export default new cart;