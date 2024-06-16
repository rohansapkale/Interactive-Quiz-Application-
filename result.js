// Retrieve user details and score from localStorage
const userName = localStorage.getItem('userName');
const quizScore = localStorage.getItem('quizScore');
const totalQuestions = 5; // Update this if you have a different number of questions

// Display user info and score
const userInfoElement = document.getElementById('user-info');
const scoreInfoElement = document.getElementById('score-info');
userInfoElement.innerHTML = `Hello, ${userName}!`;
scoreInfoElement.innerHTML = `You scored ${quizScore} out of ${totalQuestions} questions correctly.`;

// Restart quiz function
document.getElementById('restart-btn').addEventListener('click', () => {
    localStorage.clear(); // Clear local storage
    window.location.href = 'index.html'; // Redirect to start page
});
