/**
 * ADMIN MANAGED DATA:
 * In a production environment, this data would be fetched from a secure database.
 * For this client-side assignment, it serves as our centralized "Admin" storage.
 */
const collegeQuestions = [
    {
        question: "In what year was Tech University founded?",
        options: ["1985", "1995", "2000", "2010"],
        answer: "1995",
        explanation: "Tech University was established in 1995 by Dr. Alan Smith to foster innovation."
    },
    {
        question: "Which of these was the very first degree program offered?",
        options: ["Computer Science", "Mechanical Engineering", "Business Admin", "Physics"],
        answer: "Computer Science",
        explanation: "CS was our pioneer program, starting with just 40 students."
    },
    {
        question: "What is the official motto of our college?",
        options: ["Learn and Grow", "Innovate, Create, Elevate", "Knowledge is Power", "Building the Future"],
        answer: "Innovate, Create, Elevate",
        explanation: "Adopted in 1998, this motto reflects our commitment to practical, forward-thinking education."
    },
    {
        question: "Which data structure course is mandatory for all first-year CS students?",
        options: ["Advanced AI", "Data Structures & Algorithms", "Quantum Computing", "Web Design"],
        answer: "Data Structures & Algorithms",
        explanation: "DSA forms the foundational logic required for all higher-level CS courses."
    },
    {
        question: "What is the official mascot of Tech University?",
        options: ["The Binary Bear", "The Coding Cat", "The Tech Tiger", "The Cyber Eagle"],
        answer: "The Binary Bear",
        explanation: "The Binary Bear was chosen by student vote in 2001."
    },
    {
        question: "How large is the main campus?",
        options: ["100 acres", "250 acres", "500 acres", "1000 acres"],
        answer: "500 acres",
        explanation: "The campus spans 500 acres, including our 50-acre solar farm."
    },
    {
        question: "What are the official college colors?",
        options: ["Red and Gold", "Green and White", "Navy Blue and Silver", "Black and Orange"],
        answer: "Navy Blue and Silver",
        explanation: "Navy Blue represents depth of knowledge, and Silver represents technological innovation."
    },
    {
        question: "Which famous alumni is currently the CEO of TechCorp?",
        options: ["Jane Doe", "John Smith", "Ada Lovelace", "Elon Musk"],
        answer: "Jane Doe",
        explanation: "Jane Doe graduated class of 2005 and founded TechCorp five years later."
    },
    {
        question: "How many academic departments does the college currently have?",
        options: ["8", "12", "15", "20"],
        answer: "12",
        explanation: "We recently added the Department of Artificial Intelligence, bringing the total to 12."
    },
    {
        question: "Which annual festival is hosted by the Engineering department?",
        options: ["TechFest", "CodeWars", "EngiCon", "InnovateX"],
        answer: "InnovateX",
        explanation: "InnovateX brings students from across the country to showcase their hardware projects."
    }
];

// State Variables
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;
let randomizedQuestions = [];

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

const ui = {
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    submitBtn: document.getElementById('submit-btn'),
    nextBtn: document.getElementById('next-btn'),
    feedbackSection: document.getElementById('feedback-section'),
    feedbackText: document.getElementById('feedback-text'),
    feedbackExp: document.getElementById('feedback-explanation'),
    progressBar: document.getElementById('progress-bar'),
    questionCounter: document.getElementById('question-counter'),
    timerDisplay: document.getElementById('timer-display'),
    finalScore: document.getElementById('final-score'),
    scoreMessage: document.getElementById('score-message')
};

// Utility: Fisher-Yates Shuffle for Randomization
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Switch between screens
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Initialize Quiz
function startQuiz() {
    randomizedQuestions = shuffleArray(collegeQuestions).slice(0, 10); // 10 random questions
    currentQuestionIndex = 0;
    score = 0;
    showScreen('quiz');
    loadQuestion();
}

// Load Question Data into UI
function loadQuestion() {
    resetState();
    const currentQ = randomizedQuestions[currentQuestionIndex];

    // Update Stats
    ui.questionCounter.innerText = `Question ${currentQuestionIndex + 1}/${randomizedQuestions.length}`;
    ui.progressBar.style.width = `${((currentQuestionIndex) / randomizedQuestions.length) * 100}%`;

    // Render Question
    ui.questionText.innerText = currentQ.question;

    // Render Options (Randomized)
    const shuffledOptions = shuffleArray(currentQ.options);
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option-btn');
        btn.setAttribute('aria-pressed', 'false');
        btn.onclick = () => selectOption(btn);
        ui.optionsContainer.appendChild(btn);
    });

    startTimer();
}

// Handle Option Selection
function selectOption(selectedBtn) {
    const options = ui.optionsContainer.querySelectorAll('.option-btn');
    options.forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
    });

    selectedBtn.classList.add('selected');
    selectedBtn.setAttribute('aria-pressed', 'true');
    ui.submitBtn.disabled = false;
}

// Handle Answer Submission
function submitAnswer() {
    clearInterval(timerInterval);
    const selectedBtn = ui.optionsContainer.querySelector('.selected');

    // If timer ran out and nothing selected
    const userAnswer = selectedBtn ? selectedBtn.innerText : null;
    const currentQ = randomizedQuestions[currentQuestionIndex];
    const isCorrect = userAnswer === currentQ.answer;

    if (isCorrect) score++;

    provideFeedback(isCorrect, currentQ, selectedBtn);
}

// Show Instant Feedback & Animations
function provideFeedback(isCorrect, currentQ, selectedBtn) {
    ui.submitBtn.classList.add('hidden');
    ui.nextBtn.classList.remove('hidden');
    ui.feedbackSection.classList.remove('hidden');

    const options = ui.optionsContainer.querySelectorAll('.option-btn');
    options.forEach(btn => {
        btn.classList.add('disabled'); // Prevent changing answers
        if (btn.innerText === currentQ.answer) {
            btn.classList.add('correct');
        } else if (btn === selectedBtn) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        ui.feedbackSection.className = 'feedback success';
        ui.feedbackText.innerText = '✅ Correct!';
    } else {
        ui.feedbackSection.className = 'feedback error';
        ui.feedbackText.innerText = userAnswer => userAnswer ? '❌ Incorrect!' : '⏰ Time is up!';
    }
    ui.feedbackExp.innerText = currentQ.explanation;
}

// Timer Logic
function startTimer() {
    timeLeft = 15;
    ui.timerDisplay.innerText = `Time: ${timeLeft}s`;
    ui.timerDisplay.classList.remove('pulse');

    timerInterval = setInterval(() => {
        timeLeft--;
        ui.timerDisplay.innerText = `Time: ${timeLeft}s`;

        if (timeLeft <= 5) ui.timerDisplay.classList.add('pulse');

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitAnswer(); // Auto-submit when time is up
        }
    }, 1000);
}

// Move to next question or show results
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < randomizedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Reset UI state for new question
function resetState() {
    ui.optionsContainer.innerHTML = '';
    ui.feedbackSection.classList.add('hidden');
    ui.submitBtn.classList.remove('hidden');
    ui.submitBtn.disabled = true;
    ui.nextBtn.classList.add('hidden');
    clearInterval(timerInterval);

    // Re-trigger fade animation
    const qSection = document.querySelector('.question-section');
    qSection.classList.remove('animate-fade');
    void qSection.offsetWidth; // trigger reflow
    qSection.classList.add('animate-fade');
}

// Display Result Screen
function showResults() {
    showScreen('result');
    ui.finalScore.innerText = `${score} / ${randomizedQuestions.length}`;

    let message = "";
    if (score >= 8) message = "Outstanding! You really know your college history.";
    else if (score >= 5) message = "Good job! You know the basics, but there's room to learn.";
    else message = "Looks like you need a campus tour! Better luck next time.";

    ui.scoreMessage.innerText = message;
    ui.progressBar.style.width = `100%`;
}

// Web Share API implementation (Advanced Feature)
function shareResults() {
    const shareData = {
        title: 'Tech University Quiz',
        text: `I just scored ${score}/${randomizedQuestions.length} on the Tech University Quiz! Can you beat my score?`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(err => console.error('Error sharing:', err));
    } else {
        alert("Your browser doesn't support direct sharing. Take a screenshot to share your score!");
    }
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('retake-btn').addEventListener('click', startQuiz);
document.getElementById('share-btn').addEventListener('click', shareResults);