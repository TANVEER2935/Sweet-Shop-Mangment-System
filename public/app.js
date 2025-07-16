const API_URL = 'https://687787b7dba809d901efcff7.mockapi.io/sweet';

async function getSweets() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderSweets(data);
}

async function addSweet() {
  const sweet = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    quantity: parseInt(document.getElementById('quantity').value)
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sweet)
  });

  clearInputs();
  getSweets();
}

async function deleteSweet(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  getSweets();
}

function renderSweets(sweets) {
  const tbody = document.getElementById('sweetList');
  tbody.innerHTML = '';
  sweets.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td class="border px-2 py-1">${s.name}</td>
        <td class="border px-2 py-1">${s.category}</td>
        <td class="border px-2 py-1">${s.price}</td>
        <td class="border px-2 py-1">${s.quantity}</td>
        <td class="border px-2 py-1">
          <button onclick="purchase(${s.id}, ${s.quantity})" class="bg-yellow-500 text-white px-2 py-1 rounded">Buy</button>
          <button onclick="restock(${s.id}, ${s.quantity})" class="bg-green-500 text-white px-2 py-1 rounded">Restock</button>
          <button onclick="deleteSweet(${s.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function purchase(id, currentQty) {
  const qty = parseInt(prompt("Enter quantity to purchase:"));
  if (qty > currentQty) return alert("Not enough stock.");
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: currentQty - qty })
  });
  getSweets();
}

async function restock(id, currentQty) {
  const qty = parseInt(prompt("Enter quantity to restock:"));
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity: currentQty + qty })
  });
  getSweets();
}

function clearInputs() {
  ['name', 'category', 'price', 'quantity'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

getSweets();
