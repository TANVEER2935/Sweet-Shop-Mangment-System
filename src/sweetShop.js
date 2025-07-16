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
    
}



module.exports = SweetShop;
