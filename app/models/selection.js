import menu from './menu';
import product from './product';

export default class selection {
    constructor(data, selected = null) {
        this.menu = data.menu || new menu(data.xml);
        this.selected = selected || this.getDefault();
    }

    getDefault() {
        const selected = {};
        this.menu.products.forEach(product => {
            if (!selected.hasOwnProperty(product.cat)) {
                selected[product.cat] = product;
            }
        });
        return selected;
    }

    setSelected(product) {
        if (this.menu.products.find(prod => prod.id === product.id)) {
            this.selected[product.cat] = product;
        }
    }

    isSelected(product) {
        if (this.menu.products.find(prod => prod.id === product.id)) {
            return this.selected[product.cat].id === product.id;
        }

        return false;
    }
}