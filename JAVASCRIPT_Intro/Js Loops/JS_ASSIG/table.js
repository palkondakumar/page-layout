// JavaScript for Dynamic Table CRUD

// TODO: 1. Select form and table elements from the DOM
// TODO: 2. Handle form submission to add a new row
// TODO: 3. Validate input field (value)
// TODO: 4. Add new row to the table dynamically
// TODO: 5. Implement Edit button functionality to update a row
// TODO: 6. Implement Delete button functionality to remove a row
// TODO: 7. Optionally, store table data in localStorage for persistence
// TODO: 8. Optionally, load table data from localStorage on page load




let tableData = JSON.parse(localStorage.getItem("tableData"));
if (tableData == null) {
    tableData = [];
}

let editIndex = null;

displayTable();

function addRow() {

    let value = document.getElementById("table-value").value;
    

    let rowData = {
        value: value
    };

    if (editIndex == null) {
        tableData.push(rowData);
    } else {
        tableData[editIndex] = rowData;
        editIndex = null;
    }

    localStorage.setItem("tableData", JSON.stringify(tableData));

    displayTable();
    clearForm();
}

function clearForm() {
    document.getElementById("table-value").value = "";
}

function displayTable() {

    document.querySelector("tbody").innerHTML = "";

    tableData.forEach(function (data, index) {

        let mytr = document.createElement("tr");

        mytr.innerHTML = `
        <td>${data.value}</td>
        <td><button onclick="handleEdit(${index})">Edit</button></td>
        <td><button onclick="handleDelete(${index})">Delete</button></td>
        `;

        document.querySelector("tbody").appendChild(mytr);

    });

}

function handleDelete(index) {

    tableData.splice(index, 1);

    localStorage.setItem("tableData", JSON.stringify(tableData));

    displayTable();
}

function handleEdit(index) {

    let data = tableData[index];

    document.getElementById("table-value").value = data.value;

    editIndex = index;

}
