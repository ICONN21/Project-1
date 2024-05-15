//collecting data
const userNameInput = document.getElementById('username');
const emailInput = document.getElementById('userEmail');
const startButton = document.getElementById('startButton');
const userInputArray = JSON.parse(localStorage.getItem('userInputArray'))|| []

// creating start button
startButton.addEventListener('click' , function(event){
    event.preventDefault();

    const userInput = {
        user: userNameInput.value,
        email: emailInput.value
    }

    if (!userInput.user || !userInput.email) {
        alert('Please complete all fields');
    } else {

        userInputArray.push(userInput)

        localStorage.setItem('userInputArray', JSON.stringify(userInputArray));
        window.location.href = 'quiz.html';
    }
});


