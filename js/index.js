document.addEventListener('DOMContentLoaded', function() {
    let counter = localStorage.getItem('dayCounter') ? parseInt(localStorage.getItem('dayCounter')) : 0;
    document.getElementById('counter').textContent = counter;
  
    let quotes = [];
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            quotes = data.quotes;
            displayRandomQuote();
        })
        .catch(error => console.error('Error loading quotes:', error));