// SET VARIABLES
let start = document.getElementById("start-one");
let centerBlock = document.getElementById("central-block");
let lastBlock = document.getElementById("final-result");
let stop = document.getElementById("stop");
let firstCard = document.getElementById("card-stone");
let secondCard = document.getElementById("card-paper");
let thirdCard = document.getElementById("card-scissors");
let figurePlayer = document.getElementById("player-choice");
let weaponChoice = document.getElementById("choice");
let figureComputer = document.getElementById("computer-choice");
let result = document.getElementById("result");
let player = "";
let scorePlayer = 0;
let scoreComputer = 0;
let roundCounter = 1;
let computerBis ="";

// SHOW THE GAME
start.addEventListener("click", () => {
  if(getComputedStyle(centerBlock).getPropertyValue("display") === "none"){
    centerBlock.style.display = "flex";
    stop.style.display = "unset";
    start.textContent = `Round ${roundCounter}`;  
  } else {
    return
  }
})

// WHEN YOU CLICK ON CARD, CREATE ALL ANIMATION
function chooseCard (number, image, name) {
number.addEventListener("click", () => {  
  if (getComputedStyle(figurePlayer).getPropertyValue("visibility") === "hidden"){
    counter ()
    hide(image, name);
    showScore();
    start.textContent = "Next round";
    reloadChoice();
    checkScore();
    return;
  } else {
    return;
  }
})
}

// THREE CARDS AVAILABLE
chooseCard(firstCard, "./stone.png", "STONE")
chooseCard(secondCard, "./toilet-paper.png", "PAPER")
chooseCard(thirdCard, "./scissors.png", "SCISSORS")

// INCREMENT THE COUNTER EACH ROUND
let counter = () =>
  roundCounter = roundCounter + 1;

// DEFINE ALEA WEAPON COMPUTER + SHOW PICTURES RESULT ON RING
function hide (picture, weapon) {
  let computer = Math.floor((Math.random() * 3) + 1);
  switch(computer){
    case 1 :
      computer = "./stone.png";
      computerBis = "STONE";
    break;
    case 2 :
      computer = "./toilet-paper.png";
      computerBis = "PAPER";
    break;
    case 3 :
      computer = "./scissors.png";
      computerBis = "SCISSORS";
    break;
  }    

  figurePlayer.src = picture;
  figurePlayer.style.visibility = "visible";
  figureComputer.src= computer ;
  figureComputer.style.visibility = "visible";
  weaponChoice.style.visibility = "hidden";
  player = weapon;
}

// COMPARAISON, DEFINE THE WINNER OF THE ROUND
function showScore (){
  const isPlayerWinning = 
    ((computerBis === "STONE" && player === "PAPER")
  || (computerBis === "PAPER" && player === "SCISSORS")
  || (computerBis === 'SCISSORS' && player === "STONE"));
  
  if (computerBis === player) {
    showResult();
  }else if (isPlayerWinning){
    scorePlayer = scorePlayer + 1;
    showResult();
  }else{
    scoreComputer = scoreComputer + 1;
    showResult();
  }
  }

// MAKES THE MENU REAPPEAR
function reloadChoice(){
  start.addEventListener("click", () => {  
    weaponChoice.style.visibility = "visible";
    figurePlayer.style.visibility = "hidden";
    figureComputer.style.visibility = "hidden";
    start.textContent = `Round ${roundCounter}`;  
})}

// CHECK SCORE, AT 3 GAME IS stopED
function checkScore(){
  if (scorePlayer === 3 || scoreComputer === 3){
    if (scorePlayer === 3) {
      lastBlock.textContent = `You WIN in ${roundCounter} round`;
    } else {
      lastBlock.textContent = "BIG Computer always wins";
    }
  centerBlock.style.display = "none";
  lastBlock.style.display = "flex"
  stop.style.display = "none";
  start.textContent = "New game";
  start.addEventListener("click", () => { 
    location.reload();
  })
} else {
  return
}}

// MODIFY HTML SCORE
let showResult = () => {
  result.textContent = `${scorePlayer} - ${scoreComputer}`;
  result.style.visibility = "visible";
}

// stopER THE GAME - BACK AT START
stop.addEventListener("click", () => { 
    location.reload();
})