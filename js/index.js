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

    let milestones = [];
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
                milestones = data.milestones || [];
                displayMilestones();
        })
        .catch(error => console.error('Error loading milestones:', error));

document.getElementById('add-day').addEventListener('click', function() {
        counter++;
        document.getElementById('counter').textContent = counter;
        localStorage.setItem('dayCounter', counter);
    });    

document.getElementById('reset').addEventListener('click', function() {
        counter = 0;
        document.getElementById('counter').textContent = counter;
        localStorage.setItem('dayCounter', counter);
    });

document.getElementById('new-quote').addEventListener('click', displayRandomQuote);    