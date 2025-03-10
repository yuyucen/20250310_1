let table;
let question;
let options = [];
let correctAnswer;
let userAnswer = "";
let currentQuestionIndex = 0;
let nextButton;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadQuestion(currentQuestionIndex); // 加載第一個問題
  nextButton = createButton('下一題');
  nextButton.mousePressed(nextQuestion);
  nextButton.hide();
}

function draw() {
  background(220);
  textSize(20);
  text(`答對題數: ${correctCount}`, 50, 30);
  text(`答錯題數: ${incorrectCount}`, 50, 60);
  text(`408730777簡岑昱 `, 80, 90);
  
  textAlign(CENTER);
  text(question, width / 2, height / 2 - 50);
  for (let i = 0; i < options.length; i++) {
    text(options[i], width / 2, height / 2 + i * 30);
    if (mouseIsPressed && mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 - 10 + i * 30 && mouseY < height / 2 + 20 + i * 30) {
      userAnswer = options[i];
    }
  }
  if (userAnswer !== "") {
    if (userAnswer === correctAnswer) {
      fill(0, 255, 0); // 綠色
      text("答對了", width / 2, height / 2 + 150);
      correctCount++;
    } else {
      fill(255, 0, 0); // 紅色
      text("答錯了", width / 2, height / 2 + 150);
      incorrectCount++;
    }
    fill(0); // 重置顏色為黑色
    nextButton.position(width / 2 + 100, height / 2 + options.length * 30 + 20);
    nextButton.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key >= 'a' && key <= 'd') {
    userAnswer = options[key.charCodeAt(0) - 'a'.charCodeAt(0)];
  }
}

function loadQuestion(index) {
  let row = table.getRow(index);
  question = row.getString('question');
  options = [
    `a: ${row.getString('option_a')}`,
    `b: ${row.getString('option_b')}`,
    `c: ${row.getString('option_c')}`,
    `d: ${row.getString('option_d')}`
  ];
  correctAnswer = options.find(option => option.endsWith(row.getString('correct_answer')));
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % table.getRowCount();
  loadQuestion(currentQuestionIndex);
  userAnswer = "";
  nextButton.hide();
}
