//your code here
const input = document.getElementById('imageInput');
const button = document.querySelector('button');
const originalImage = document.getElementById('originalImage');
const processedImage = document.getElementById('processedImage');

button.addEventListener('click', () => {
    const file = input.files[0];
    if (!file) {
        alert('Please upload an image first.');
        return;
    }
    originalImage.src = URL.createObjectURL(file);
    const url = 'https://api.imagga.com/v2/colors';
    const formData = new FormData();
    formData.append('image', file);
    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Basic ' + btoa('api_key:api_secret') 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("API Processing Success:", data);
    })
    .catch(error => {
        console.error("Error during image processing:", error);
    });
});