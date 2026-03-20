// TODO: 1. Select gallery and table elements from the DOM
// TODO: 2. Load and display images
// TODO: 3. Handle image addition (if applicable)
// TODO: 4. Add images to the table dynamically
// TODO: 5. Implement Edit button functionality to update image details
// TODO: 6. Implement Delete button functionality to remove an image
// TODO: 7. Optionally, store images in localStorage for persistence
// TODO: 8. Optionally, load images from localStorage on page load






const gallery = document.querySelector(".gallery");
const tableBody = document.querySelector("tbody");


let images = JSON.parse(localStorage.getItem("images")) || [];


function displayImages() {
    gallery.innerHTML = "";
    tableBody.innerHTML = "";

    images.forEach((img, index) => {

        
        const imageEl = document.createElement("img");
        imageEl.src = img;
        gallery.appendChild(imageEl);

        
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${img}" width="100"></td>
            <td><button onclick="editImage(${index})">Edit</button></td>
            <td><button onclick="deleteImage(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });

    
    localStorage.setItem("images", JSON.stringify(images));
}


function addImage() {
    const url = prompt("Enter Image URL:");
    if (url) {
        images.push(url);
        displayImages();
    }
}


function editImage(index) {
    const newUrl = prompt("Edit Image URL:", images[index]);
    if (newUrl) {
        images[index] = newUrl;
        displayImages();
    }
}


function deleteImage(index) {
    images.splice(index, 1);
    displayImages();
}


displayImages();


const addBtn = document.createElement("button");
addBtn.innerText = "Add Image";
addBtn.style.display = "block";
addBtn.style.margin = "10px auto";
addBtn.onclick = addImage;

document.querySelector(".container").prepend(addBtn);