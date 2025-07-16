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
}

module.exports = SweetShop;
