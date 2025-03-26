document.addEventListener('DOMContentLoaded', function() {
    let dayCount = localStorage.getItem('dayCount') || 0;
    document.getElementById('counter').textContent = dayCount;

    const addDayBtn = document.getElementById('add-day');
    const resetBtn = document.getElementById('reset');
    const newQuoteBtn = document.getElementById('new-quote');
    const milestoneForm = document.getElementById('milestone-form');
    const milestoneList = document.getElementById('milestone-list');
    const quoteElement = document.getElementById('quote');

    addDayBtn.addEventListener('click', function() {
        dayCount++;
        document.getElementById('counter').textContent = dayCount;
        localStorage.setItem('dayCount', dayCount);
        addMilestoneToList(`Day ${dayCount} completed!`);
        saveMilestoneToDB(`Day ${dayCount} completed!`);
    });

    resetBtn.addEventListener('click', function() {
        dayCount = 0;
        document.getElementById('counter').textContent = dayCount;
        localStorage.setItem('dayCount', dayCount);
        milestoneList.innerHTML = '';
        clearMilestonesInDB();
    });

    milestoneForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const milestoneInput = document.getElementById('milestone');
        const milestoneText = milestoneInput.value.trim();
        
        if (milestoneText) {
            addMilestoneToList(milestoneText);
            saveMilestoneToDB(milestoneText);
            milestoneInput.value = '';
        }
    });

    newQuoteBtn.addEventListener('click', fetchRandomQuote);

    fetch('https://breaking-the-cycle-backend.vercel.app/milestones')
        .then(response => response.json())
        .then(milestones => {
            milestones.forEach(milestone => {
                addMilestoneToList(milestone.text, milestone.id);
            });
        });

    fetchRandomQuote();

    function addMilestoneToList(text, id) {
        const li = document.createElement('li');
        li.textContent = text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-milestone';
        deleteBtn.addEventListener('click', function() {
            deleteMilestoneFromDB(id || Date.now());
            li.remove();
        });
        
        li.appendChild(deleteBtn);
        milestoneList.appendChild(li);
    }

    function saveMilestoneToDB(text) {
        fetch('https://breaking-the-cycle-backend.vercel.app/milestones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, id: Date.now() })
        });
    }

    function deleteMilestoneFromDB(id) {
        fetch(`https://breaking-the-cycle-backend.vercel.app/milestones/${id}`, {
            method: 'DELETE'
        });
    }

    function clearMilestonesInDB() {
        fetch('https://breaking-the-cycle-backend.vercel.app/milestones', {
            method: 'DELETE'
        });
    }

    function fetchRandomQuote() {
        fetch('https://breaking-the-cycle-backend.vercel.app/quotes')
            .then(response => response.json())
            .then(quotes => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                quoteElement.textContent = quotes[randomIndex].text;
            });
    }
});