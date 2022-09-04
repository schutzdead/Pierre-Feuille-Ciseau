// SET VARIABLES

const itemValues = {
  rock: "ROCK",
  paper: "PAPER",
  scissors: "SCISSORS"
};

const items = {
  rock: {
    value: itemValues.rock,
    imagePath: "stone.png",
  },
  paper: {
    value: itemValues.paper,
    imagePath: "toilet-paper.png",
  },
  scissors: {
    value: itemValues.scissors,
    imagePath: "scissors.png",
  }
}

let startElement = document.getElementById("start-one");
let centerBlock = document.getElementById("central-block");
let lastBlock = document.getElementById("final-result");
let stopElement = document.getElementById("stop");
let weaponChoiceElement = document.getElementById("choice");
let resultElement = document.getElementById("result");
let roundCounter = 1;

const computer = {
  item: {
    imagePath: "",
    value: undefined
  },
  figureElement: document.getElementById("computer-choice"),
  score: 0
};

const player = {
  item: {
    imagePath: "",
    value: undefined
  },
  figureElement: document.getElementById("player-choice"),
  score: 0,
}

let isPlayerChoosing = true;

const firstCard = {
  element: document.getElementById("card-stone"),
  item: items.rock
};
const secondCard = {
  element: document.getElementById("card-paper"),
  item: items.paper
};
const thirdCard = {
  element: document.getElementById("card-scissors"),
  item: items.scissors
};

const cards = [firstCard, secondCard, thirdCard];

// SHOW THE GAME
startElement.addEventListener("click", () => {
  if (getComputedStyle(centerBlock).getPropertyValue("display") === "none") {
    centerBlock.style.display = "flex";
    stopElement.style.display = "unset";
    startElement.textContent = `Round ${roundCounter}`;
  }
})

// WHEN YOU CLICK ON CARD, CREATE ALL ANIMATION
function defineCardEventListener(card, item) {
  card.addEventListener("click", () => {
    if (isPlayerChoosing) {
      isPlayerChoosing = false;
      incrementCounter();
      setRingPicturesAndHideChoices(item);
      showScore();
      startElement.textContent = "Next round";
      addStartElementReloadChoiceEvent();
      checkScore();
    }
  })
}

// THREE CARDS AVAILABLE
cards.forEach(card => {
  defineCardEventListener(card.element, card.item);
});


// INCREMENT THE COUNTER EACH ROUND
function incrementCounter() {
  roundCounter = roundCounter + 1;
}

function getRandomItem() {
  let randomChoice = Math.floor((Math.random() * 3) + 1);
  switch (randomChoice) {
    case 1:
      return items.rock;
    case 2:
      return items.paper;
    case 3:
      return items.scissors;
  }
}

// DEFINE ALEA WEAPON COMPUTER + SHOW PICTURES RESULT ON RING
function setRingPicturesAndHideChoices(playerItem) {

  player.item.value = playerItem.value;
  setPictureElement(playerItem.imagePath, player.figureElement);

  computer.item = getRandomItem();
  setPictureElement(computer.item.imagePath, computer.figureElement);

  weaponChoiceElement.style.visibility = "hidden";
}

function setPictureElement(imagePath, element) {
  element.src = imagePath;
  element.style.visibility = "visible";
}

// COMPARAISON, DEFINE THE WINNER OF THE ROUND
function showScore() {
  const isPlayerWinning =
    ((computer.item.value === itemValues.rock && player.item.value === itemValues.paper)
      || (computer.item.value === itemValues.paper && player.item.value === itemValues.scissors)
      || (computer.item.value === itemValues.scissors && player.item.value === itemValues.rock));

  if (isPlayerWinning) {
    player.score = player.score + 1;
  } else if (computer.item.value !== player.item.value) {
    computer.score = computer.score + 1;
  }
  showResult();
}

// MAKES THE MENU REAPPEAR
function addStartElementReloadChoiceEvent() {
  startElement.removeEventListener("click", reloadChoice);
  startElement.addEventListener("click", reloadChoice);
}

function reloadChoice() {
  weaponChoiceElement.style.visibility = "visible";
  player.figureElement.style.visibility = "hidden";
  computer.figureElement.style.visibility = "hidden";
  startElement.textContent = `Round ${roundCounter}`;

  isPlayerChoosing = true;
}

// CHECK SCORE, AT 3 GAME IS stopED
function checkScore() {
  if (player.score === 3 || computer.score === 3) {
    if (player.score === 3) {
      lastBlock.textContent = `You WIN in ${roundCounter} round`;
    } else {
      lastBlock.textContent = "BIG Computer always wins";
    }
    centerBlock.style.display = "none";
    lastBlock.style.display = "flex"
    stopElement.style.display = "none";
    startElement.textContent = "New game";
    startElement.addEventListener("click", () => {
      location.reload();
    })
  }
}

// MODIFY HTML SCORE
let showResult = () => {
  resultElement.textContent = `${player.score} - ${computer.score}`;
  resultElement.style.visibility = "visible";
}

// stopER THE GAME - BACK AT START
stopElement.addEventListener("click", () => {
  location.reload();
})