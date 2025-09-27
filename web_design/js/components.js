const myHeaders = new Headers();
myHeaders.append("student_number", "s4823633");  
myHeaders.append("uqcloud_zone_id", "5c15aad3");  


function submitProductForm(formData) {
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,  
        redirect: "follow"
     };
  
     // POST
     fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/", requestOptions)
        .then(response => response.json())
        .then(result => {
           console.log(result);  // Output the results to the console for debugging
           alert("Product successfully submitted!");  // Give feedback to users
        })
        .catch(error => console.error('Error:', error));  // Handle errors that occur
}

export { myHeaders, submitProductForm };