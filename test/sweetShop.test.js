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

describe('SweetShop - Delete Sweet', () => {
  it('should delete a sweet by ID', () => {
    const shop = new SweetShop();
    const sweet = { id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 };
    shop.addSweet(sweet);
    shop.deleteSweet(1002);
    expect(shop.getAllSweets()).not.toContainEqual(sweet);
  });

  it('should throw an error when deleting a sweet that does not exist', () => {
    const shop = new SweetShop();
    expect(() => shop.deleteSweet(9999)).toThrow("Sweet not found.");
  });
});

describe('SweetShop - Search Sweets', () => {
  let shop;
  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 });
    shop.addSweet({ id: 3, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 });
  });

  it('should find sweets by name', () => {
    const result = shop.searchByName("Gulab");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Gulab Jamun");
  });

  it('should find sweets by category', () => {
    const result = shop.searchByCategory("Milk-Based");
    expect(result.length).toBe(1);
  });

  it('should find sweets in price range', () => {
    const result = shop.searchByPriceRange(10, 40);
    expect(result.length).toBe(2);
  });
});

