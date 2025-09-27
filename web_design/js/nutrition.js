// IMPORTS
import { myHeaders, submitProductForm } from './components.js';


// START UP

document.addEventListener('DOMContentLoaded', function (){
   loadProducts();
})

// EVENT LISTENERS

// API  POST
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevents the default form submission behavior
 
    // Get form element
    const form = document.getElementById('productForm');
 
    // Serialize form datas using FormData
    const formData = new FormData(form);

    submitProductForm(formData);
 
 });



 // API GET
function loadProducts() {
 
    const requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
    };
 
    // Send a GET request for product data
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/", requestOptions)
       .then(response => response.json())
       .then(data => {
          console.log(data);  // Print the data returned by the API
          let output = '';
          data.forEach(product => {
             // Generate HTML structure to display product information
             output += `
                <div class="card">
                   ${product.product_photo 
                     ? `<img src="${product.product_photo}" alt="${product.product_name}" class="product-image">` 
                     : `<img src="images/default-placeholder.webp" alt="Default Image" class="product-image">`}
                   <h3>${product.product_name}</h3>
                   <p>Owner: ${product.product_owner}</p>
                   <p>${product.product_description}</p>
                   
                </div>
             `;
          });
          // Insert the generated HTML into the page
          document.getElementById('product-list').innerHTML = output;
       })
       .catch(error => console.error('Error:', error));  // Handle errors that occur
 }

