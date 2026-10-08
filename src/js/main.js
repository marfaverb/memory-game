import { gsap } from "gsap";

const emojis = [
  "🧉",
  "🍡",
  "🥞",
  "🍔",
  "🍕",
  "🍧",
  "🍮",
  "🍰",
  "🥭",
  "🍒",
  "🍦",
  "🧋",
  "🧉",
  "🍡",
  "🥞",
  "🍔",
  "🍕",
  "🍧",
  "🍮",
  "🍰",
  "🥭",
  "🍒",
  "🍦",
  "🧋",
];

let firstChoice = null;
let secondChoice = null;
let cardLeftToMatch = emojis.length / 2; //length en js c'est le shiffre//

const board = document.querySelector("#board");

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const createCard = (emoji) => {
  const cardElement = document.createElement("div");
  cardElement.dataset.emoji = emoji;
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

shuffle(emojis).forEach((emoji) => {
  const cardElement = createCard(emoji);

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
        setTimeout(() => {
          hideCard(firstChoice);
          hideCard(secondChoice);
          resetChoices();
        }, 1000);
      }
    } else {
      // on ne fait rien
    }
  });

  board.appendChild(cardElement);
});

gsap.from(".card", {
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});
