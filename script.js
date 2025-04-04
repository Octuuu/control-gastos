const expenseForm = document.getElementById('expenseForm');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const expenseList = document.getElementById('expenseList');
const expenseChart = document.getElementById('expenseChart').getContext("2d");

let expenses = JSON.parse(localStorage.getItem('expenses')) || {};


document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
  renderChart();
  
});

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
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












