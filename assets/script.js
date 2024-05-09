const _question = document.getElementById('question')
const _options = document.querySelector('.quiz-options')
const _correctScore = document.getElementById('correct_score')
const _totalQuestion = document.getElementById('total_questions') 
const _checkBtn = document.getElementById('check-answer')
const _playAgainBtn = document.getElementById('play-again')

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 20;
// https://opentdb.com/api.php?amount=10'

//adding event listeners for the page on different elements. 
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswers);
}

document.addEventListener('DOMContenteLoaded', () => {
 loadingQuestion()
 _totalQuestion.textContent = totalQuestion;
 _correctScore.textContent = correctScore;
});

async function loadingQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=20'
    const result = await fetch (`${apiUrl}`)
    const data = await result.json();
    showQuestion(data.results[0])
    console.log(data.results)

}
loadingQuestion()


function showQuestion(data) {
let correctAnswer = data.correct_answer;
let incorrectAnswer = data.incorrect_answers;
let optionsList = incorrectAnswer;
optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer) // inserts the correct answer into a random  position

_question.innerHTML = `${data.question} <br> <span class = 'category'> ${data.category} </span>`;
_options.innerHTML = `${optionsList.map((option, index) => '<li> ${index + 1}. <span> ${option} </span> </li>').join('')}`;

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
    _checkBtn.disabled = true;
    if(_options.querySelector('.selcted')) {
        let selectedAnswer = _options.querySelector('.selcted span').textContent;
    }
}