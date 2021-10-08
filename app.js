//MODEL

const model = {
  methods: {
    questionId: 0,
    answerId: 0,
    questionIdGenerator: () => {
      model.methods.questionId++;
    },
    answerIdGenerator: () => {
      model.methods.answerId++;
    },
    createTagAndSetClass: (tagName, className, customAttr, valueCustomAttr) => {
      let a = document.createElement(tagName);
      a.setAttribute("class", className);
      if (tagName == "input") {
        a.setAttribute("name", "answer" + model.methods.questionId);
      }
      if (customAttr && valueCustomAttr) {
        a.setAttribute(customAttr, valueCustomAttr);
      }
      return a;
    },
  },

  data: [],
};

//CREATE QUESTION BLOCK
const addQuestionBlock = (numberOfAnswers) => {
  //create question and answer block
  const container = document.querySelector(".container");
  const questionBlockDivMain = model.methods.createTagAndSetClass(
    "div",
    "question-block"
  );
  const questionDiv = model.methods.createTagAndSetClass("div", "question");
  const answerDiv = model.methods.createTagAndSetClass("div", "answer");

  questionBlockDivMain.append(questionDiv);
  questionBlockDivMain.append(answerDiv);

  questionDiv.setAttribute("id", model.methods.questionId);
  questionDiv.innerText = model.data[model.methods.questionId].questionText; // add question from data to view

  //create number of options(answers)
  for (let i = 0; i < numberOfAnswers; i++) {
    const optionDiv = model.methods.createTagAndSetClass("div", "option");
    const inputDiv = model.methods.createTagAndSetClass(
      "input",
      "radio",
      "type",
      "radio"
    );
    const labelDiv = model.methods.createTagAndSetClass("label", "label");
    labelDiv.innerText =
      model.data[model.methods.questionId].dataAnswer[i].answerText;

    console.log(model.data);
    answerDiv.append(optionDiv);
    optionDiv.append(inputDiv);
    optionDiv.append(labelDiv);
  }

  container.append(questionBlockDivMain);
  model.methods.questionIdGenerator(); // increase 1 point to questions id

  return questionBlockDivMain;
};

//FORM
const quizzForm = document.querySelector(".quizz-form");

quizzForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(quizzForm.question.value);
  console.log(quizzForm.answer[0].value);
  const obj = {
    questionId: model.methods.questionId,
    questionText: quizzForm.question.value,
    numberOfAnswers: 4,
    dataAnswer: [
      {
        answerId: 0,
        answerText: quizzForm.answer[0].value,
        isCorrect: false,
      },
      {
        answerId: 1,
        answerText: quizzForm.answer[1].value,
        isCorrect: false,
      },
      {
        answerId: 2,
        answerText: quizzForm.answer[2].value,
        isCorrect: false,
      },
      {
        answerId: 3,
        answerText: quizzForm.answer[3].value,
        isCorrect: false,
      },
    ],
  };

  console.log(model);

  model.data.push(obj);

  addQuestionBlock(4);

  //clear input texts
  quizzForm.question.value = "";
  for (let i = 0; i < 4; i++) {
    quizzForm.answer[i].value = "";
  }
});
console.log(model);
