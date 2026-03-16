
const form = document.querySelector("form");
const nameInput = document.getElementById("contact-name");
const phoneInput = document.getElementById("contact-phone");
const emailInput = document.getElementById("contact-email");
const tableBody = document.querySelector("tbody");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;



window.onload = function () {
    displayContacts();
};



form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();


    if (name === "" || phone === "" || email === "") {
        alert("Please fill all fields");
        return;
    }

    const contact = {
        name: name,
        phone: phone,
        email: email
    };

    if (editIndex === -1) {
        contacts.push(contact); 
    } else {
        contacts[editIndex] = contact; 
        editIndex = -1;
    }

    saveContacts();
    displayContacts();
    form.reset();
});



function displayContacts() {

    tableBody.innerHTML = "";

    contacts.forEach(function (contact, index) {

        const row = document.createElement("tr");
 
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td><button onclick="editContact(${index})">Edit</button></td>
        <td><button onclick="deleteContact(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}



function editContact(index) {

    const contact = contacts[index];

    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    editIndex = index;
}



function deleteContact(index) {

    contacts.splice(index, 1); 

    saveContacts();
    displayContacts();
}

function saveContacts() {

    localStorage.setItem("contacts", JSON.stringify(contacts));
}