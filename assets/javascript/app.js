var allAnswers;
var correct_answer;
var trivia;
var q = [Math.floor(Math.random() * 50) + 1];
var i = [0, 1, 2, 3];
var clockRunning = false;
var timeleft;
var attempts = 1;
var correct = 1;
var gameRunning = false;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
shuffle(i);

$('document').ready(function () {

  var $newGameButton = document.getElementById('new-game-button');
  $newGameButton.addEventListener('click', newGame);

  //go get questions when new game is clicked

  function newGame() {
    if(clockRunning){
      return;
    }
    gameRunning = true;
    correct = 1;
    attempts = 1;
    timer();
    newQuestion();
    document.getElementById("attempts").innerHTML = attempts;
    document.getElementById("correct").innerHTML = correct;
  }

  function newQuestion() {
    document.getElementById("attempts").innerHTML = attempts;
    document.getElementById("correct").innerHTML = correct;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        trivia = JSON.parse(this.responseText);
        var q = [Math.floor(Math.random() * 50) + 1];
        correct_answer = trivia.results[q].correct_answer;
        allAnswers = trivia.results[q].incorrect_answers.concat(trivia.results[q].correct_answer);

        document.getElementById("question").innerHTML = trivia.results[q].question;
        document.getElementById("answer-a").innerHTML = allAnswers[i[0]];
        document.getElementById("answer-b").innerHTML = allAnswers[i[1]];
        document.getElementById("answer-c").innerHTML = allAnswers[i[2]];
        document.getElementById("answer-d").innerHTML = allAnswers[i[3]];

        console.log(q);
        console.log(i);
        console.log(trivia.results[q]);
        console.log(allAnswers);
        console.log(trivia.results[q].correct_answer)
      }
    };
    xmlhttp.open("GET", "https://opentdb.com/api.php?amount=50&category=15&type=multiple", true);
    xmlhttp.send();
  }

  //answer buttons

  var selectedAnswer

  var $selectedAnswerA = document.getElementById('answer-button-a');
  $selectedAnswerA.addEventListener('click', selectA);
  var $selectedAnswerB = document.getElementById('answer-button-b');
  $selectedAnswerB.addEventListener('click', selectB);
  var $selectedAnswerC = document.getElementById('answer-button-c');
  $selectedAnswerC.addEventListener('click', selectC);
  var $selectedAnswerD = document.getElementById('answer-button-d');
  $selectedAnswerD.addEventListener('click', selectD);

  function selectA() {
    var selected = document.getElementById('answer-button-a');
    selected.classList.add('selected');
    var selected = document.getElementById('answer-button-b');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-c');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-d');
    selected.classList.remove('selected');
    selectedAnswer = allAnswers[i[0]];
    console.log(allAnswers[i[0]]);
    console.log(selectedAnswer);
  }

  function selectB() {
    var selected = document.getElementById('answer-button-b');
    selected.classList.add('selected');
    var selected = document.getElementById('answer-button-a');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-c');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-d');
    selected.classList.remove('selected');
    selectedAnswer = allAnswers[i[1]];
    console.log(allAnswers[i[1]]);
    console.log(selectedAnswer);
  }

  function selectC() {
    var selected = document.getElementById('answer-button-c');
    selected.classList.add('selected');
    var selected = document.getElementById('answer-button-a');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-b');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-d');
    selected.classList.remove('selected');
    selectedAnswer = allAnswers[i[2]];
    console.log(allAnswers[i[2]]);
    console.log(selectedAnswer);

  }

  function selectD() {
    var selected = document.getElementById('answer-button-d');
    selected.classList.add('selected');
    var selected = document.getElementById('answer-button-a');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-b');
    selected.classList.remove('selected');
    var selected = document.getElementById('answer-button-c');
    selected.classList.remove('selected');
    selectedAnswer = allAnswers[i[3]];
    console.log(allAnswers[i[3]]);
    console.log(selectedAnswer);
  }

  var $selectedFinalAnswer = document.getElementById('final-answer-button');
  $selectedFinalAnswer.addEventListener('click', finalAnswer);

  function finalAnswer() {

    if (timeleft === 0) {
      return;
    }

    if (selectedAnswer === null) {
      return;
    }

    if (!gameRunning) {
      return;
    }
    if (correct === 10) {
      setTimeout(alert('YOU WIN'), 1000);
      attempts = 1;
    }

    if (selectedAnswer == correct_answer) {
      document.getElementById("correct").innerHTML = correct++;
      var selected = document.getElementById('answer-button-d');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-a');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-b');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-c');
      selected.classList.remove('selected');
      shuffle(i);
      newQuestion();
      selectedAnswer = null;
      timeleft = 31;
    } else {
      document.getElementById("attempts").innerHTML = attempts;
      correct = 1;
      attempts++
      document.getElementById("correct").innerHTML = correct;
      var selected = document.getElementById('answer-button-d');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-a');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-b');
      selected.classList.remove('selected');
      var selected = document.getElementById('answer-button-c');
      selected.classList.remove('selected');
      shuffle(i);
      newQuestion();
      selectedAnswer = null;
      alert('Try Again =)')
    }
  }

  function timer() {
    if (!clockRunning) {
      timeleft = 31;
      var downloadTimer = setInterval(function () {
        timeleft--;
        document.getElementById("time").textContent = timeleft;
        if (timeleft <= 0) {
          clearInterval(downloadTimer)
          setTimeout(function () {
            alert("Times Up!");
          }, 300);

          attempts = (attempts + 1);
          correct = 1;
          clockRunning = false;
        } else if (correct === 11) {
          clearInterval(downloadTimer)
          clockRunning = false;
          document.getElementById("time").textContent = 00;
          document.getElementById("correct").innerHTML = 0;
        };

      }, 1000);

      clockRunning = true;
    }
  }  
});





//click new game
//fetch question 1, 
//set timer


//randomly shuffle answers (idk how tf this part is going to work)



//clicking on an answer selects it, aka changes its apperence, stores a boolean that for that value
//clicking another answer selects that one and deselects the other
//clicking on final answer button submits it
//only allow final answer button to be clicked if an answer has been selected


// if sumbited answer = correct_answer 
// go get Q2 and add replace Q1, 
// then reset timer, 
// score board correct answers +
//if correct answers = 10, win


//if submited answer = incorect_answers,
// lose, 
// change score board wrong +1 
//correct answers = 0