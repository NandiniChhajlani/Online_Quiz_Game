const question = document.querySelector("#question");
const choice = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "The World's Largest Desert Is?",
    choice1: "Thar",
    choice2: "Kalahari",
    choice3: "Sahara",
    choice4: "Sonoran",
    answer: 3,
  },
  {
    question: "The device used for measuring altitudes is?",
    choice1: "Altimeter",
    choice2: "Ammeter",
    choice3: "Audiometer",
    choice4: "Galvanometer",
    answer: 1,
  },
  {
    question: "Deficiency of Iron leads to?",
    choice1: "Rickets",
    choice2: "Malaria",
    choice3: "Dental Cavity",
    choice4: "Anaemia",
    answer: 4,
  },
  {
    question: "The largest fresh water lake in India is?",
    choice1: "Pulicat Lake",
    choice2: "Veeranam Lake",
    choice3: "Chilka Lake",
    choice4: "Kolleru Lake",
    answer: 3,
  },
  {
    question: "The hottest planet in the solar system?",
    choice1: "Earth",
    choice2: "Venus",
    choice3: "Mars",
    choice4: "Jupiter",
    answer: 2,
  },
  {
    question: "Silver gets corroded due to?",
    choice1: "Oxygen",
    choice2: "Hydrogen Sulphide",
    choice3: "Carbon Dioxide",
    choice4: "Nitrogen",
    answer: 2,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  questionCounter++;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choice.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choice.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    
    let classToApply = 
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";  

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
