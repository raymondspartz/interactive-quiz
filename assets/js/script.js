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
};

let clearMain = function () {
  while (mainBody.firstChild) {
    mainBody.removeChild(mainBody.firstChild);
  }
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