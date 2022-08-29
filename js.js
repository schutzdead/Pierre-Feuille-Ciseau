// SET VARIABLES
let start = document.getElementById("start_one");
let center_block = document.getElementById("central_block");
let last_block = document.getElementById("final_result");
let stopp = document.getElementById("stop");
let first_card = document.getElementById("card1");
let second_card = document.getElementById("card2");
let third_card = document.getElementById("card3");
let figure_player = document.getElementById("player_choice");
let weapon_choice = document.getElementById("choice");
let figure_computer = document.getElementById("computer_choice");
let result = document.getElementById("result");
let player = "";
let score_player = 0;
let score_computer = 0;
let round_counter = 1;
let computer_bis ="";

// SHOW THE GAME
start.addEventListener("click", () => {
  if(getComputedStyle(center_block).getPropertyValue("display") === "none"){
    center_block.style.display = "flex";
    stopp.style.display = "unset";
    start.textContent = `Round ${round_counter}`;  
  } else {
    return
  }
})

// WHEN YOU CLICK ON CARD, CREATE ALL ANIMATION
function choose_card (number, image, name) {
number.addEventListener("click", () => {  
  if (getComputedStyle(figure_player).getPropertyValue("visibility") === "hidden"){
    counter ()
    hide(image, name);
    show_score();
    start.textContent = "Next round";
    reload_choice();
    check_score();
    return;
  } else {
    return;
  }
})
}

// THREE CARDS AVAILABLE
choose_card(first_card, "./stone.png", "STONE")
choose_card(second_card, "./toilet-paper.png", "PAPER")
choose_card(third_card, "./scissors.png", "SCISSORS")

// INCREMENT THE COUNTER EACH ROUND
let counter = () =>
  round_counter = round_counter + 1;

// DEFINE ALEA WEAPON COMPUTER + SHOW PICTURES RESULT ON RING
function hide (picture, weapon) {
  let computer = Math.floor((Math.random() * 3) + 1);
  switch(computer){
    case 1 :
      computer = "./stone.png";
      computer_bis = "STONE";
    break;
    case 2 :
      computer = "./toilet-paper.png";
      computer_bis = "PAPER";
    break;
    case 3 :
      computer = "./scissors.png";
      computer_bis = "SCISSORS";
    break;
  }    

  figure_player.src = picture;
  figure_player.style.visibility = "visible";
  figure_computer.src= computer ;
  figure_computer.style.visibility = "visible";
  weapon_choice.style.visibility = "hidden";
  player = weapon;
}

// COMPARAISON, DEFINE THE WINNER OF THE ROUND
function show_score (){
  const is_playerwinning = 
    ((computer_bis === "STONE" && player === "PAPER")
  || (computer_bis === "PAPER" && player === "SCISSORS")
  || (computer_bis === 'SCISSORS' && player === "STONE"));
  
  if (computer_bis === player) {
    show_result();
  }else if (is_playerwinning){
    score_player = score_player + 1;
    show_result();
  }else{
    score_computer = score_computer + 1;
    show_result();
  }
  }

// MAKES THE MENU REAPPEAR
function reload_choice(){
  start.addEventListener("click", () => {  
    weapon_choice.style.visibility = "visible";
    figure_player.style.visibility = "hidden";
    figure_computer.style.visibility = "hidden";
    start.textContent = `Round ${round_counter}`;  
})}

// CHECK SCORE, AT 3 GAME IS STOPPED
function check_score(){
  if (score_player === 3 || score_computer === 3){
    if (score_player === 3) {
      last_block.textContent = `You WIN in ${round_counter} round`;
    } else {
      last_block.textContent = "BIG Computer always wins";
    }
  center_block.style.display = "none";
  last_block.style.display = "flex"
  stopp.style.display = "none";
  start.textContent = "New game";
  start.addEventListener("click", () => { 
    location.reload();
  })
} else {
  return
}}

// MODIFY HTML SCORE
let show_result = () => {
  result.textContent = `${score_player} - ${score_computer}`;
  result.style.visibility = "visible";
}

// STOPPER THE GAME - BACK AT START
stopp.addEventListener("click", () => { 
    location.reload();
})