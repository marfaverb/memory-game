import { gsap } from "gsap";
const board = document.querySelector("#board");
console.log(board);

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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
shuffleArray(emojis);

emojis.forEach((emoji) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.emoji = emoji;

  board.appendChild(cardElement);

  cardElement.addEventListener("click", () => {
    if (firstChoice === null) {
      firstChoice = cardElement;
      cardElement.classList.add("card-emoji");
    } else if (secondChoice === null) {
      secondChoice = cardElement;
      cardElement.classList.add("card-emoji");

      if (firstChoice.dataset.emoji === secondChoice.dataset.emoji) {
        firstChoice = null;
        secondChoice = null;
        cardLeftToMatch = cardLeftToMatch - 1;
        if (cardLeftToMatch === 0) {
          window.alert("bravo vous avez gagné :)");
        }
      }
    } else {
      firstChoice.classList.remove("card-emoji");
      secondChoice.classList.remove("card-emoji");
      firstChoice = cardElement;
      secondChoice = null;
      cardElement.classList.add("card-emoji");
    }
  });
});

gsap.from(".card", {
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});

/**
 * 1. retourner les cartes (rendre l'emoji invisible)
 * -la carte de base ne doit pas afficher l'emoji
 * -quand on clic sur la carte, l'emoji s'affiche
 */
