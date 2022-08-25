// START THE GAME, SHOW ALL

let start = document.getElementById("start_one");
let center_block = document.getElementById("central_block");
let last_block = document.getElementById("final_result");
let stopp = document.getElementById("stop");
console.log()

start.addEventListener("click", () => {
  if(getComputedStyle(center_block).getPropertyValue("display") === "none"){
    center_block.style.display = "flex";
    stopp.style.display = "unset";
    start.textContent = `Round ${round_counter}`;  
  } else {
    return
  }
})

// CHOOSE THE WEAPON + PICTURE APPEARS ON THE RING + SCORE

let first_card = document.getElementById("card1");
let second_card = document.getElementById("card2");
let third_card = document.getElementById("card3");
let figure_player = document.getElementById("player_choice");
let weapon_choice = document.getElementById("choice");
let figure_computer = document.getElementById("computer_choice");
let result = document.getElementById("result");
let player = ";";
let score_player = 0;
let score_computer = 0;
let round_counter = 1;
let computer_bis ="";

function show_result () {
  result.textContent = `${score_player} - ${score_computer}`;
}

function hide (picture, weapon) {
// DEFINE ALEA COMPUTER 
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

first_card.addEventListener("click", () => {  
  if (getComputedStyle(figure_player).getPropertyValue("visibility") === "hidden"){
    counter ()
    hide("./stone.png", "STONE");
    show_score();
    next_round();
    reload_choice();
    check_score();
    return;
  } else {
    return;
  }
})

second_card.addEventListener("click", () => {  
  if (getComputedStyle(figure_player).getPropertyValue("visibility") === "hidden"){
    counter ()
    hide("./toilet-paper.png", "PAPER");
    show_score();
    reload_choice();
    check_score();
    return;
  } else {
    return;
  }
})

third_card.addEventListener("click", () => {  
  if (getComputedStyle(figure_player).getPropertyValue("visibility") === "hidden"){
    counter ()
    hide("./scissors.png", "SCISSORS");
    show_score();
    reload_choice();
    check_score();
    return;
  } else {
    return;
  }
})

function counter (){
  round_counter = round_counter + 1;
}

function check_score(){
  if (score_player === 3 || score_computer === 3){
    if (score_player === 3) {
      last_block.textContent = "You WIN";
    } else {
      last_block.textContent = " The BIG Computer always wins";
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
}
}

function next_round(){
  start.textContent = "Next round";
}

function reload_choice(){
  start.addEventListener("click", () => {  
    weapon_choice.style.visibility = "visible";
    figure_player.style.visibility = "hidden";
    figure_computer.style.visibility = "hidden";
    start.textContent = `Round ${round_counter}`;  
})}

function show_score (){
const is_playerwinning = 
  ((computer_bis === "STONE" && player === "PAPER")
|| (computer_bis === "PAPER" && player === "SCISSORS")
|| (computer_bis === 'SCISSORS' && player === "STONE"));

if (computer_bis === player) {
  show_result();
  next_round();  
}else if (is_playerwinning){
  score_player = score_player + 1;
  show_result();
  next_round()
}else{
  score_computer = score_computer + 1;
  show_result();
  next_round()
}
}

// STOPPER THE GAME - BACK AT START
stopp.addEventListener("click", () => { 
  location.reload();
})