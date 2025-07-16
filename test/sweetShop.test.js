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

describe('SweetShop - Sort Sweets', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 });
    shop.addSweet({ id: 2, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 });
    shop.addSweet({ id: 3, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 });
  });

  it('should sort sweets by price ascending', () => {
    const sorted = shop.sortSweetsBy("price");
    expect(sorted[0].price).toBe(10);
    expect(sorted[2].price).toBe(50);
  });

  it('should sort sweets by name alphabetically', () => {
    const sorted = shop.sortSweetsBy("name");
    expect(sorted[0].name).toBe("Gajar Halwa");
  });
});


describe('SweetShop - Purchase Sweet', () => {
  it('should reduce quantity after purchase', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 10 });
    shop.purchaseSweet(1, 3);
    const sweet = shop.getAllSweets()[0];
    expect(sweet.quantity).toBe(7);
  });

  it('should throw error if not enough stock', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 2 });
    expect(() => shop.purchaseSweet(1, 5)).toThrow("Insufficient stock.");
  });
});


describe('SweetShop - Restock Sweet', () => {
  it('should increase quantity after restocking', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 5 });
    shop.restockSweet(1, 10);
    const sweet = shop.getAllSweets()[0];
    expect(sweet.quantity).toBe(15);
  });

  it('should throw error if sweet not found', () => {
    const shop = new SweetShop();
    expect(() => shop.restockSweet(999, 5)).toThrow("Sweet not found.");
  });
});
