// TODO: 1. Select form and table elements from the DOM
// TODO: 2. Handle form submission to add a new note
// TODO: 3. Validate input field (note content)
// TODO: 4. Add new note to the table dynamically
// TODO: 5. Implement Edit button functionality to update note
// TODO: 6. Implement Delete button functionality to remove a note
// TODO: 7. Optionally, store notes in localStorage for persistence
// TODO: 8. Optionally, load notes from localStorage on page load






 let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
let editIndex = null;

displayTasks();

function addTask() {
  let taskInput = document.getElementById("note-input").value;

  let task = {
    name: taskInput
  };

  if (editIndex === null) {
    allTasks.push(task); // CREATE
  } else {
    allTasks[editIndex] = task; // UPDATE
    editIndex = null;
  }

  localStorage.setItem("allTasks", JSON.stringify(allTasks));

  displayTasks();
  clearForm();
}

function displayTasks() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  allTasks.forEach((task, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td><button onclick="handleEdit(${index})">Edit</button></td>
      <td><button onclick="handleDelete(${index})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
}

function handleDelete(index) {
  allTasks.splice(index, 1); // DELETE
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  displayTasks();
}

function handleEdit(index) {
  let task = allTasks[index];
  document.getElementById("note-input").value = task.name;
  editIndex = index;
}

function clearForm() {
  document.getElementById("note-input").value = "";
}