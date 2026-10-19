import { gsap } from "gsap";

const images = [
  "red-velvet",
  "blackberry-wave",
  "blueberry-night",
  "blue-oreo",
  "tiramisu",
  "sneakers",
  "pistachio",
  "oreo",
  "mango",
  "matcha",
  "matcha-strawberry",
  "dragon-cake",
  "red-velvet",
  "blackberry-wave",
  "blueberry-night",
  "blue-oreo",
  "tiramisu",
  "sneakers",
  "pistachio",
  "oreo",
  "mango",
  "matcha",
  "matcha-strawberry",
  "dragon-cake",
];

let firstChoice = null;
let secondChoice = null;
let cardLeftToMatch = images.length / 2; //length en js c'est le shiffre//

const board = document.querySelector("#board");
const startButton = document.querySelector("#restart-button");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const createCard = (image) => {
  const cardElement = document.createElement("div");
  cardElement.dataset.emoji = image;
  cardElement.classList.add("card");

  return cardElement;
};

const hideCard = (cardElement) => {
  cardElement.classList.remove("card-emoji");
};

const revealCard = (cardElement) => {
  cardElement.classList.add("card-emoji");
};

const resetChoices = () => {
  firstChoice = null;
  secondChoice = null;
};

const startGame = () => {
  resetChoices();
  cardLeftToMatch = images.length / 2;

  board.innerHTML = "";

  shuffle([...images]).forEach((image) => {
    const cardElement = createCard(image);

    cardElement.addEventListener("click", () => {
      if (cardElement.classList.contains("card-emoji")) {
        return;
      }

      if (firstChoice === null) {
        firstChoice = cardElement;

        revealCard(cardElement);
      } else if (secondChoice === null && firstChoice !== cardElement) {
        secondChoice = cardElement;

        revealCard(cardElement);

        if (firstChoice.dataset.emoji === secondChoice.dataset.emoji) {
          cardLeftToMatch = cardLeftToMatch - 1;
          if (cardLeftToMatch === 0) {
            window.alert("Bravo !");
          }
          resetChoices();
        } else {
          timer = setTimeout(() => {
            hideCard(firstChoice);
            hideCard(secondChoice);
            resetChoices();
          }, 1000);
        }
      }
    });

    board.appendChild(cardElement);
  });

  gsap.from(".card", {
    duration: 1,
    opacity: 0,
    stagger: 0.1,
  });
};

startButton.addEventListener("click", () => {
  startGame();
  startButton.textContent = "restart game";
});

startGame();
