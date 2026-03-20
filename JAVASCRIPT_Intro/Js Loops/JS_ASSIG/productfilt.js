
// TODO: 1. Select search input, product grid, and table elements from the DOM
// TODO: 2. Load and display products
// TODO: 3. Handle search/filter input to filter products
// TODO: 4. Add products to the table dynamically
// TODO: 5. Implement Edit button functionality to update a product
// TODO: 6. Implement Delete button functionality to remove a product
// TODO: 7. Optionally, store products in localStorage for persistence
// TODO: 8. Optionally, load products from localStorage on page load



const searchInput = document.getElementById("search");
const tableBody = document.querySelector("tbody");

let products = JSON.parse(localStorage.getItem("products")) || [
    { name: "Sample Product" }
];



function displayProducts(list) {
    tableBody.innerHTML = "";

    list.forEach((product, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td><button onclick="editProduct(${index})">Edit</button></td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}



searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        let name = searchInput.value;


        if (name !== "") {
            products.push({ name: name });
            saveToLocalStorage();
            displayProducts(products);
            searchInput.value = "";
        }
    }
});



searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filteredProducts);
});



function editProduct(index) {
    let updatedName = prompt("Edit product:", products[index].name);

    if (updatedName !== "") {
        products[index].name = updatedName;
        saveToLocalStorage();
        displayProducts(products);
    }
}



function deleteProduct(index) {
    if (confirm("Delete this product?")) {
        products.splice(index, 1);
        saveToLocalStorage();
        displayProducts(products);
    }
}



function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
}



displayProducts(products);










