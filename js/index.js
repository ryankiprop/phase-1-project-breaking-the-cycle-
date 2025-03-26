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

document.getElementById('milestone-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const milestoneInput = document.getElementById('milestone');
    const newMilestone = milestoneInput.value.trim();

    if (newMilestone) {
        milestones.push({
            id: Date.now(),
            text: newMilestone,
            date: new Date().toLocaleDateString()
        });

        milestoneInput.value = '';
        displayMilestones();
        saveMilestones();
    }
});

function displayRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('quote').textContent = quotes[randomIndex];
    } else {
        document.getElementById('quote').textContent = "You're doing great! Keep going!";
    }
}

function displayMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    milestoneList.innerHTML = '';
    
    milestones.forEach(milestone => {
        const li = document.createElement('li');
        li.textContent = `${milestone.date}: ${milestone.text}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteMilestone(milestone.id));
        
        li.appendChild(deleteBtn);
        milestoneList.appendChild(li);
    });
}

function deleteMilestone(id) {
    milestones = milestones.filter(milestone => milestone.id !== id);
    displayMilestones();
    saveMilestones();
}


