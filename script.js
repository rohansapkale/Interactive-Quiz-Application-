const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        a: "Harper Lee",
        b: "J.K. Rowling",
        c: "Ernest Hemingway",
        d: "Mark Twain",
        correct: "a"
    },
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "What is the chemical symbol for water?",
        a: "H2O",
        b: "O2",
        c: "CO2",
        d: "H2SO4",
        correct: "a"
    },
    {
        question: "Who painted the Mona Lisa?",
        a: "Vincent Van Gogh",
        b: "Leonardo da Vinci",
        c: "Pablo Picasso",
        d: "Claude Monet",
        correct: "b"
    },
    {
        question: "What is the main ingredient in guacamole?",
        a: "Tomato",
        b: "Avocado",
        c: "Cucumber",
        d: "Bell Pepper",
        correct: "b"
    },
    {
        question: "What is the smallest unit of matter?",
        a: "Atom",
        b: "Molecule",
        c: "Electron",
        d: "Neutron",
        correct: "a"
    },
    {
        question: "What is the capital of Japan?",
        a: "Seoul",
        b: "Tokyo",
        c: "Beijing",
        d: "Bangkok",
        correct: "b"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Gold",
        b: "Oxygen",
        c: "Osmium",
        d: "Oganesson",
        correct: "b"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        a: "William Shakespeare",
        b: "George Bernard Shaw",
        c: "Oscar Wilde",
        d: "Tennessee Williams",
        correct: "a"
    },
    {
        question: "What is the boiling point of water?",
        a: "100°C",
        b: "0°C",
        c: "50°C",
        d: "150°C",
        correct: "a"
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic",
        b: "Indian",
        c: "Arctic",
        d: "Pacific",
        correct: "d"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        a: "Gold",
        b: "Iron",
        c: "Diamond",
        d: "Platinum",
        correct: "c"
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Venus",
        correct: "b"
    },
    {
        question: "What is the largest organ in the human body?",
        a: "Heart",
        b: "Liver",
        c: "Skin",
        d: "Brain",
        correct: "c"
    }
];

const userForm = document.getElementById('user-form');
const quizScreen = document.getElementById('quiz-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const questionContainer = document.getElementById('question-container');
const timerElement = document.getElementById('time');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedQuestions = [];

// Function to start quiz
function startQuiz() {
    saveUserDetails();
    reloadPageForQuiz();
}

// Function to reload the page and show quiz screen
function reloadPageForQuiz() {
    window.location.reload();
}

// Function to get random subset of questions
function getRandomQuestions(data, numQuestions) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Function to load a question
function loadQuestion() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 30;
    updateTimer();
    const questionData = selectedQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p>${currentQuestionIndex + 1}. ${questionData.question}</p>
        <label class="answer">
            <input type="radio" name="answer" value="a"> ${questionData.a}
        </label>
        <label class="answer">
            <input type="radio" name="answer" value="b"> ${questionData.b}
        </label>
        <label class="answer">
            <input type="radio" name="answer" value="c"> ${questionData.c}
        </label>
        <label class="answer">
            <input type="radio" name="answer" value="d"> ${questionData.d}
        </label>
    `;
    nextButton.disabled = true; // Disable button initially
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.addEventListener('change', () => {
            nextButton.disabled = false; // Enable the button when an answer is selected
        });
    });
    timer = setInterval(countdown, 1000);
}

// Function to handle countdown timer
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        timeLeft = 0;
    } else {
        timeLeft--;
        updateTimer();
    }
}

// Function to update timer display
function updateTimer() {
    timerElement.textContent = timeLeft;
}

// Function to submit user details
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    startQuiz();
});

// Function to save user details
function saveUserDetails() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
}

// Function to initialize quiz screen
function initializeQuizScreen() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    if (userName && userEmail) {
        welcomeScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        selectedQuestions = getRandomQuestions(quizData, 5);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
}

// Function to go to next question
nextButton.addEventListener('click', () => {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Function to check answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === selectedQuestions[currentQuestionIndex].correct) {
        score++;
    }
}

// Function to show results
function showResults() {
    localStorage.setItem('quizScore', score);
    window.location.href = 'result.html'; // Redirect to result page
}

// Initialize the quiz screen if user details are available
initializeQuizScreen();