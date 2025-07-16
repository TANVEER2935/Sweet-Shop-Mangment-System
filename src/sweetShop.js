class SweetShop {
    constructor() {
        this.sweets = [];
    }

    addSweet(sweet) {
        const exists = this.sweets.some(s => s.id === sweet.id);
        if (exists) throw new Error("Sweet with this ID already exists.");
        this.sweets.push(sweet);
    }

    getAllSweets() {
        return this.sweets;
    }

    deleteSweet(id) {
        const index = this.sweets.findIndex(s => s.id === id);
        if (index === -1) throw new Error("Sweet not found.");
        this.sweets.splice(index, 1);
    }

    searchByName(name) {
        return this.sweets.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }

    searchByCategory(category) {
        return this.sweets.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    searchByPriceRange(min, max) {
        return this.sweets.filter(s => s.price >= min && s.price <= max);
    }

    sortSweetsBy(field) {
        return [...this.sweets].sort((a, b) => {
            if (typeof a[field] === "string") {
                return a[field].localeCompare(b[field]);
            }
            return a[field] - b[field];
        });
    }

    purchaseSweet(id, quantity) {
        const sweet = this.sweets.find(s => s.id === id);
        if (!sweet) throw new Error("Sweet not found.");
        if (sweet.quantity < quantity) throw new Error("Insufficient stock.");
        sweet.quantity -= quantity;
    }

    restockSweet(id, quantity) {
        const sweet = this.sweets.find(s => s.id === id);
        if (!sweet) throw new Error("Sweet not found.");
        sweet.quantity += quantity;
    }


}

module.exports = SweetShop;
