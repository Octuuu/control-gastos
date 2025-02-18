// script.js

// Elementos del DOM
const expenseForm = document.getElementById('expenseForm');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const expenseList = document.getElementById('expenseList');
const expenseChart = document.getElementById('expenseChart').getContext("2d");

// variables globales
let expenses = JSON.parse(localStorage.getItem('expenses')) || {};


// Inicializar la apicacion 

document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
  renderChart();
});

// Agregar evento al formulario

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // crear nuevo gasto
  const newExpense = {
    id : Date.now(),
    name : expenseName.value,
    amount : parseFloat(expenseAmount.value),
    category : expenseCategory.value,
  }

  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Limpiar formulario
  expenseForm.reset();
  renderExpenses();
  renderChart();
})

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");

    li.innerHTML = `
    ${expense.name} - $${expense.amount.toFixed(2)}
    <span> {${expense.category}] </span>
    <button class="delete-btn" data-id="${expense.id}">Eliminar</button>
    `;

    li.querySelector(".delete-btn").addEventListener('click', () => {
      deleteExpense(expense.id);
    });

    expenseList.appendChild(li);
  });
}

// Eliminar gasto
function deleteExpense(id){
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  renderChart();
}

function renderChart() {
  const categories = ["Comida", "Transporte", "Entretenimiento", "Otros"];
  const categoryTotals = categories.map((category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  });

  new Chart(expenseChart, {
    type: "pie",
    data: {
      labels: categories,
      datasets:
      [ 
        {
          data: categoryTotals,
          backgroundColor: ["#007BFF", "#28a745", "#ffc107", "#dc3545"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  })
}



/*
// Elementos del DOM
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const expenseChart = document.getElementById("expenseChart").getContext("2d");

// Variables globales
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Inicializar aplicación
document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
  renderChart();
});

// Agregar evento al formulario
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Crear nuevo gasto
  const newExpense = {
    id: Date.now(),
    name: expenseName.value,
    amount: parseFloat(expenseAmount.value),
    category: expenseCategory.value,
  };

  // Agregar al array y guardar en localStorage
  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Limpiar formulario y recargar lista
  expenseForm.reset();
  renderExpenses();
  renderChart();
});

// Renderizar lista de gastos
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.name} - $${expense.amount.toFixed(2)}
      <span>[${expense.category}]</span>
      <button class="delete-btn" data-id="${expense.id}">Eliminar</button>
    `;

    // Botón de eliminar
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteExpense(expense.id);
    });

    expenseList.appendChild(li);
  });
}

// Eliminar gasto
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  renderChart();
}

// Generar gráfico con Chart.js
function renderChart() {
  const categories = ["Comida", "Transporte", "Entretenimiento", "Otros"];
  const categoryTotals = categories.map((category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  });

  new Chart(expenseChart, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          data: categoryTotals,
          backgroundColor: ["#007BFF", "#28a745", "#ffc107", "#dc3545"],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
*/