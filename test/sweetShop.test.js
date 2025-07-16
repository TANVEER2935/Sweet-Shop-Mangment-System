const SweetShop = require('../src/sweetShop');

describe('SweetShop - Add Sweet', () => {
  it('should add a sweet with valid details', () => {
    const shop = new SweetShop();
    const sweet = {
      id: 1001,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };
    shop.addSweet(sweet);
    const sweets = shop.getAllSweets();
    expect(sweets).toContainEqual(sweet);
  });

  it('should not allow adding a sweet with duplicate ID', () => {
    const shop = new SweetShop();
    const sweet1 = { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 };
    const sweet2 = { id: 1001, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 30 };
    shop.addSweet(sweet1);
    expect(() => shop.addSweet(sweet2)).toThrow("Sweet with this ID already exists.");
  });
});
