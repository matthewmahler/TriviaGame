var $newGameButton = document.getElementById('new-game-button');
$newGameButton.addEventListener('click', newGame);
var q = [Math.floor(Math.random() * 50) + 1];
var i = [0, 1, 2];
//go get questions when new game is clicked
function newGame() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trivia = JSON.parse(this.responseText);
      var q = [Math.floor(Math.random() * 50) + 1];

      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }
      shuffle(i);

      document.getElementById("question").innerHTML = trivia.results[q].question;
      document.getElementById("answer-a").innerHTML = trivia.results[q].correct_answer;
      document.getElementById("answer-b").innerHTML = trivia.results[q].incorrect_answers[i[0]];
      document.getElementById("answer-c").innerHTML = trivia.results[q].incorrect_answers[i[1]];
      document.getElementById("answer-d").innerHTML = trivia.results[q].incorrect_answers[i[2]];
      document.getElementById("attempts").innerHTML = attempts++;
      console.log(q)
      console.log(i)
    }
  };
  xmlhttp.open("GET", "https://opentdb.com/api.php?amount=50&type=multiple", true);
  xmlhttp.send();
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
shuffle(i);

//answer buttons

var selectedAnswer = "";

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
  selectedAnswer = "a";
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
  selectedAnswer = "b";
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
  selectedAnswer = "c";
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
  selectedAnswer = "d";
  console.log(selectedAnswer);
}



var attempts = 1;
var correct = 1;

var $selectedFinalAnswer = document.getElementById('final-answer-button');
$selectedFinalAnswer.addEventListener('click', finalAnswer);

function finalAnswer() {
  if (selectedAnswer == "a") {
    document.getElementById("correct").innerHTML = correct++;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var trivia = JSON.parse(this.responseText);
        var q = [Math.floor(Math.random() * 50) + 1];
  
        function shuffle(a) {
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }
        shuffle(i);
  
        document.getElementById("question").innerHTML = trivia.results[q].question;
        document.getElementById("answer-a").innerHTML = trivia.results[q].correct_answer;
        document.getElementById("answer-b").innerHTML = trivia.results[q].incorrect_answers[i[0]];
        document.getElementById("answer-c").innerHTML = trivia.results[q].incorrect_answers[i[1]];
        document.getElementById("answer-d").innerHTML = trivia.results[q].incorrect_answers[i[2]];
        console.log(q)
        console.log(i)
      }
    };
    xmlhttp.open("GET", "https://opentdb.com/api.php?amount=50&type=multiple", true);
    xmlhttp.send();
  }
}

//click new game
//fetch question 1, 
//set timer


//randomly shuffle answers (if how tf this part is going to work)



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
// change score board attempts +1 
//correct answers = 0