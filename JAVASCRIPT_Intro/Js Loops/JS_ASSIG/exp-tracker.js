
// TODO: 1. Select form and table elements from the DOM
// TODO: 2. Handle form submission to add a new expense
// TODO: 3. Validate input fields (expense name, amount)
// TODO: 4. Add new expense to the table dynamically
// TODO: 5. Update total expense when items are added/removed/edited
// TODO: 6. Implement Edit button functionality to update expense
// TODO: 7. Implement Delete button functionality to remove an expense
// TODO: 8. Optionally, store expenses in localStorage for persistence
// TODO: 9. Optionally, load expenses from localStorage on page load


let expenseData = JSON.parse(localStorage.getItem("expenseData"));
if (expenseData == null) {
    expenseData = [];
}
let editIndex = null;
displayTable();


function addExpense() {

    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;

    if (name === "" || amount === "") {
        alert("Enter valid data");
        return;
    }

    let rowData = {
        name: name,
        amount: parseFloat(amount)
    };

    expenseData.push(rowData);

    localStorage.setItem("expenseData", JSON.stringify(expenseData));

    displayTable();
    clearForm();
}


function updateExpense() {

    if (editIndex == null) {
        alert("Please click Edit first");
        return;
    }

    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;

    if (name === "" || amount === "") {
        alert("Enter valid data");
        return;
    }

    let rowData = {
        name: name,
        amount: parseFloat(amount)
    };

    expenseData[editIndex] = rowData;

    localStorage.setItem("expenseData", JSON.stringify(expenseData));

    editIndex = null;

    displayTable();
    clearForm();
}

function clearForm() {
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
}


function displayTable() {

    document.querySelector("tbody").innerHTML = "";

    let total = 0;

    expenseData.forEach(function (data, index) {

        total += data.amount;

        let mytr = document.createElement("tr");

        mytr.innerHTML = `
        <td>${data.name}</td>
        <td>$${data.amount}</td>
        <td><button onclick="handleEdit(${index})">Edit</button></td>
        <td><button onclick="handleDelete(${index})">Delete</button></td>
        `;

        document.querySelector("tbody").appendChild(mytr);

    });

    document.querySelector(".total").innerText = "Total: $" + total;
}


function handleDelete(index) {

    expenseData.splice(index, 1);

    localStorage.setItem("expenseData", JSON.stringify(expenseData));

    displayTable();
}


function handleEdit(index) {

    let data = expenseData[index];

    document.getElementById("expense-name").value = data.name;
    document.getElementById("expense-amount").value = data.amount;

    editIndex = index;
}

