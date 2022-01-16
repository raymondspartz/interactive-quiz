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

  // creates the new sections dynamically
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

// Create second section of quiz that contains answer choices.
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

// Create first section of quiz that contains the question.
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

document.querySelector(".quizBegin").addEventListener("click", quizBegin);
