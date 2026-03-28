// =======================
// SAMPLE DATA (REMOVE if your repo already provides data.js)
// =======================

let users = [
  { id: 1, name: "Alice", email: "alice@email.com", portfolio: [1, 2] },
  { id: 2, name: "Bob", email: "bob@email.com", portfolio: [2] }
];

let stocks = [
  { id: 1, name: "Apple", symbol: "AAPL", price: 180 },
  { id: 2, name: "Tesla", symbol: "TSLA", price: 250 }
];

// =======================
// STATE
// =======================

let currentUserId = null;

// =======================
// DOM ELEMENTS
// =======================

const userList = document.querySelector("#user-list");
const stockList = document.querySelector("#stock-list");
const portfolio = document.querySelector("#portfolio");
const stockDetails = document.querySelector("#stock-details");

const form = document.querySelector("#user-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

// =======================
// INIT
// =======================

document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
  renderStocks();
});

// =======================
// RENDER USERS
// =======================

function renderUsers() {
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");

    li.textContent = user.name;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => selectUser(user.id));

    // delete button
    const btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteUser(user.id);
    });

    li.appendChild(btn);
    userList.appendChild(li);
  });
}

// =======================
// RENDER STOCKS
// =======================

function renderStocks() {
  stockList.innerHTML = "";

  stocks.forEach(stock => {
    const li = document.createElement("li");

    li.textContent = `${stock.symbol} - ${stock.name}`;
    li.style.cursor = "pointer";

    li.addEventListener("click", () => showStock(stock.id));

    stockList.appendChild(li);
  });
}

// =======================
// SELECT USER
// =======================

function selectUser(id) {
  currentUserId = id;

  const user = users.find(u => u.id === id);

  // fill form
  nameInput.value = user.name;
  emailInput.value = user.email;

  renderPortfolio(user);
}

// =======================
// RENDER PORTFOLIO
// =======================

function renderPortfolio(user) {
  portfolio.innerHTML = "";

  user.portfolio.forEach(stockId => {
    const stock = stocks.find(s => s.id === stockId);

    const div = document.createElement("div");
    div.textContent = `${stock.symbol} - ${stock.name} ($${stock.price})`;

    portfolio.appendChild(div);
  });
}

// =======================
// SHOW STOCK DETAILS
// =======================

function showStock(id) {
  const stock = stocks.find(s => s.id === id);

  stockDetails.innerHTML = `
    <h3>${stock.name}</h3>
    <p>Symbol: ${stock.symbol}</p>
    <p>Price: $${stock.price}</p>
  `;
}

// =======================
// UPDATE USER
// =======================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = users.find(u => u.id === currentUserId);

  user.name = nameInput.value;
  user.email = emailInput.value;

  renderUsers();
  selectUser(currentUserId);
});

// =======================
// DELETE USER
// =======================

function deleteUser(id) {
  users = users.filter(u => u.id !== id);

  if (currentUserId === id) {
    currentUserId = null;
    portfolio.innerHTML = "";
    form.reset();
  }

  renderUsers();
}