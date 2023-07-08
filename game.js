var buttonColor = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClick = [];
var wrong = "wrong";
var level = 0;
var posIndex = 0;
var started = false;

// This function creates a sequence which is displayed to the user with annimation and sound
function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(() => {
    $("#level-title").text("Level " + level);
  }, 1200);
  setTimeout(() => {
    $("#" + randomChosenColor)
      .fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
  }, 2900);
}

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// This function plays assigned sound based on button clicked and if answer is wrong
function makeSound(color) {
  const audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}
// This checks for button clicked by the user
let buttonClicked = $(".btn");
for (let i = 0; i < buttonClicked.length; i++) {
  buttonClicked[i].addEventListener("click", function () {
    var buttonId = buttonColor[i];
    makeSound(buttonId);
    buttonAnnimation(buttonId);
    userClick.push(buttonId);
    gameCheck();
  });
}

// This function compares user clicked button and game parttern
function gameCheck() {
  // this compares two arrays
  const compareArrays = (a, b) =>
    a.every((element, index) => element === b[index]);

  if (gamePattern.length === 1) {
    if (compareArrays(gamePattern, userClick)) {
      userClick = [];
      nextSequence();
    } else {
      userClick = [];
      gameOver();
    }
  } else if (
    gamePattern[posIndex] === userClick[posIndex] &&
    gamePattern.length > userClick.length
  ) {
    posIndex++;
    return true;
  } else if (
    gamePattern[posIndex] === userClick[posIndex] &&
    gamePattern.length === userClick.length
  ) {
    posIndex = 0;
    userClick = [];
    nextSequence();
  } else if (
    gamePattern[posIndex] !== userClick &&
    gamePattern.length > userClick.length
  ) {
    gameOver();
  } else if (!compareArrays(gamePattern, userClick)) {
    gameOver();
  } else {
    gameOver();
  }
}

// this function alerts user that game is over for selecting wrong button
function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  bodyAnnimation();
  makeSound(wrong);
  userClick = [];
  startOver();
}

// various Animations(game over, button)
function buttonAnnimation(buttonId) {
  var activeButton = $("#" + buttonId);
  activeButton.addClass("pressed");
  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 100);
}

function bodyAnnimation() {
  var activeBody = $("body");
  activeBody.addClass("game-over");

  setTimeout(function () {
    activeBody.removeClass("game-over");
  }, 300);
}

// Game Restart function
function startOver() {
  level = 0;
  posIndex = 0;
  gamePattern = [];
  started = false;
}
