const _question = document.getElementById('question')
const _options = document.querySelector('.options')
const _correctScore = document.getElementById('correct-score')
const _totalQuestion = document.getElementById('total-questions') 
const _checkBtn = document.getElementById('check-answer')
const _playAgainBtn = document.getElementById('play-again')
const _result = document.getElementById('result')


let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 20;

//adding event listeners for the page on different elements. 
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswers);
    _playAgainBtn.addEventListener('click', restartQuiz)
}

document.addEventListener('DOMContentLoaded', () => {
 loadingQuestion()
 eventListeners()
 addToLocalStorage()
 _totalQuestion.textContent = totalQuestion;
 _correctScore.textContent = correctScore;
});

async function loadingQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=20'
    const result = await fetch (`${apiUrl}`)
    const data = await result.json();
    showQuestion(data.results[0])
    console.log(data.results[0])
    // console.log(data.results)
}



//print question and options to the windo
function showQuestion(data) {
    _checkBtn.disabled = false;
correctAnswer = data.correct_answer;
let incorrectAnswer = data.incorrect_answers;
let optionsList = incorrectAnswer;
optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer) // inserts the correct answer into a random  position

_question.innerHTML = `${data.question} <br> <span class = 'category'> ${data.category} </span>`;
_options.innerHTML = `${optionsList.map((option, index) => `<li> ${index + 1}. <span> ${option} </span> </li>`).join('')}`;

selectOption()
}

function selectOption() {
    _options.querySelectorAll('li').forEach((option => {
        option.addEventListener('click', () => {
            if(_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected')
        })
    }))

}

function checkAnswers() {
    // console.log('checkAnswers', _options.querySelector('.selected'))
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent.trim();
        // console.log('checkAnswers', selectedAnswer, correctAnswer)
        if(selectedAnswer == correctAnswer) {
        console.log({correctScore})
        correctScore++
            _result.innerHTML = `<p> <i class = "fas fa-check"><i>Correct Answer! </p>`;
        } else {
            _result.innerHTML = `<p><small><b>Correct Answer: </b> ${correctAnswer}</small></p>`
        }
        checkCount()
    }
}

function checkCount() {
    console.log('checkCount')
    askedCount++;
    setCount();
    if(askedCount == totalQuestion) {

    } else {
        setTimeout(() => {
            loadingQuestion();
        }, 400);
    }
}

function setCount() {
    // console.log('setCount', correctScore, totalQuestion)
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
    
}

function restartQuiz() {
    correctScore = askedCount = 0
    _playAgainBtn.style.display = "block"
    _checkBtn.style.display = "block"
    _checkBtn.disabled = false;
    _result.innerHTML = " "
    setCount();
    loadingQuestion()
}

function addToLocalStorage() {
    localStorage.setItem('correctScore', correctScore)
}

