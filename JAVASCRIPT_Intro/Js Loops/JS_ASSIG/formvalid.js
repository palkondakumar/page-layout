// TODO: 1. Select form and table elements from the DOM
// TODO: 2. Handle form submission and validate all fields
// TODO: 3. Show error messages for invalid input
// TODO: 4. Add valid submission to the table dynamically
// TODO: 5. Implement Edit button functionality to update submission
// TODO: 6. Implement Delete button functionality to remove a submission
// TODO: 7. Optionally, store submissions in localStorage for persistence
// TODO: 8. Optionally, load submissions from localStorage on page load


let allusers = JSON.parse(localStorage.getItem("allusers"));

if (allusers == null) {
    allusers = [];
}

let editIndex = null;

displayUsers();

function addUser() {

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

     
    if (user.name === "" || user.email === "" || user.password === "") {
        document.querySelector(".error").textContent = "Please fill all fields";
        return;
    }

    document.querySelector(".error").textContent = "";

    if (editIndex == null) {
        allusers.push(user);
    } else {
        allusers[editIndex] = user;
        editIndex = null;
    }

    localStorage.setItem("allusers", JSON.stringify(allusers));

    displayUsers();
    clearform();
}

function clearform() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function displayUsers() {

    document.getElementById("tbody").innerHTML = "";

    allusers.forEach(function (user, index) {

        let mytr = document.createElement("tr");

        mytr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button onclick="handleEdit(${index})">Edit</button></td>
        <td><button onclick="handleDelete(${index})">Delete</button></td>
        `;

        document.getElementById("tbody").appendChild(mytr);
    });
}

function handleDelete(index) {

    allusers.splice(index, 1);

    localStorage.setItem("allusers", JSON.stringify(allusers));

    displayUsers();
}

function handleEdit(index) {

    let user = allusers[index];

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;

    editIndex = index;
}

