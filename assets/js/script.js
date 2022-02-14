let mainBody = document.querySelector("main");
let timeCount = 60;
let currentSlide = 1;
let scoreArr;
let questionObj = {
  question1: {
    title: "How do you create an array in JavaScript?",
    options: [
      "var x = [] this one ",
      "array = {}",
      "array = []",
      "function array = {}",
    ],
  },
  question2: {
    title: "How do you create an array in JavaScript?",
    options: [
      "var x = [] this one ",
      "array = {}",
      "array = []",
      "function array = {}",
    ],
  },
  question3: {
    title: "How do you create an array in JavaScript?",
    options: [
      "var x = [] this one ",
      "array = {}",
      "array = []",
      "function array = {}",
    ],
  },
  question4: {
    title: "How do you create an array in JavaScript?",
    options: [
      "var x = [] this one ",
      "array = {}",
      "array = []",
      "function array = {}",
    ],
  },
  question5: {
    title: "How do you create an array in JavaScript?",
    options: [
      "var x = [] this one ",
      "array = {}",
      "array = []",
      "function array = {}",
    ],
  },
};

let clearMain = function () {
  while (mainBody.firstChild) {
    mainBody.removeChild(mainBody.firstChild);
  }
};

// Start timer when quiz begins.
let startTimer = function () {
  let timer = document.querySelector("span");
  timeCount = 60;
  let timerFunction = setInterval(function () {
    if (timeCount < 0) {
      timeCount = 0;
    }
    // Check to make sure the timer hasn't run out and there are still more slides left.
    if (timeCount > 0 && currentSlide < 7) {
      timeCount--;
      timer.textContent = timeCount;
    } else {
      clearInterval(timerFunction);
      timer.textContent = timeCount;
      endGame();
    }
  }, 1000);
};

// Begin the quiz game.
let quizBegin = function () {
  clearMain();
  currentSlide = 1;
  timeCount = 60;

  // Creates the new sections dynamically
  let newSection;
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      newSection = newQuestionSection();
    } else if (i === 1) {
      newSection = newAnswerSection();
    } else if (i === 2) {
      newSection = newFeedbackSection();
    }
    mainBody.appendChild(newSection);
  }

  loadQA();
  checkAnswer();
  startTimer(mainBody);
};

//////////////////////////////////////////////////////////////////////////////

// Create 1st section to ask the question
let addQuestionSection = function () {
  newSection = document.createElement("section");
  newSection.className = "questionSection";

  let newDiv = document.createElement("div");
  newDiv.className = "questionDiv";
  newSection.appendChild(newDiv);

  let questionHeader = document.createElement("h1");
  questionHeader.className = "question";
  newDiv.appendChild(questionHeader);

  return newSection;
};

// Create 2nd that displays the options
let newOptionSection = function () {
  newSection.className = "optionSection";

  newDiv = document.createElement("div");
  newDiv.className = "answerDiv";
  newSection.appendChild(newDiv);

  for (let i = 0; i < 4; i++) {
    let btn = document.createElement("button");
    btn.className = "answers";
    newDiv.appendChild(btn);
  }
  // Call function to determine and randomize answer content.
  loadAnswers();

  return newSection;
};

// Create 3rd section to validate the answer
let newCheckAnswerSection = function () {
  let feedbackHeader = document.createElement("h2");
  feedbackHeader.id = "feedback";

  newSection = document.createElement("section");
  newSection.className = "checkAnswerSection";

  newSection.appendChild(feedbackHeader);

  return newSection;
};

// Check users answer when they select one, then provide feedback.
let checkAnswer = function () {
  let answerButtons = document.querySelectorAll(".answers");
  let feedbackHeader = document.querySelector("#feedback");
  // Adds an event listener to every button with the class name of "answers".
  answerButtons.forEach((btn) => {
    // Without differentiating "mousedown" and "mouseup" between these event listeners,
    // the "currentTarget" method would not return the correct current value.
    btn.addEventListener("mousedown", function (event) {
      if (event.currentTarget.id === "answer3") {
        feedbackHeader.textContent = "Correct!";
      } else {
        feedbackHeader.textContent = "Wrong!";
        timeCount = timeCount - 10;
      }
    });
    // After checking the users answer, the next questions and answers will load.
    btn.addEventListener("mouseup", loadQA);
  });
};

////////////////////////////////////////////////////////////////////////////

let loadQuestion = function () {
  let questionKey = "question" + currentView;
  let currentQuestion = questionObj[questionKey].title;

  return currentQuestion;
};

document.querySelector(".quizBegin").addEventListener("click", quizBegin);

let loadAnswers = function () {
  let answerButtons = document.querySelector(".answerDiv").children;
  let arr = [];
  let num;
  for (let i = 0; i < answerButtons.length; i++) {
    let randomize = function () {
      // Give a random value to num that is between 1 and the length of
      // the amount of children, or answer choices, for each slide.
      num = Math.floor(Math.random() * answerButtons.length) + 1;
      // Check each random number; If that number has already been chosen,
      // run the randomize function again to find a unique one.
      if (arr.indexOf(num) >= 0) {
        return randomize();
      }
      return num;
    };
    // Add the unique randomized num to the array.
    arr.push(randomize());
  }
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].id = "answer" + arr[i];
    // Determine which answer values to grab and display based on the
    // indivdual buttons assigned id.
    let questionKey = "question" + currentSlide;
    let val = arr[i] - 1;
    answerButtons[i].textContent = questionObj[questionKey].answers[val];
  }
};
