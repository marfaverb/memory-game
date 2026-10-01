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
  return array;
}

const resetChoices = () => {
  firstChoice = null;
  secondChoice = null;
};
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
        gsap.to([firstChoice, secondChoice], {
          duration: 0.5,
          scale: 2,
          opacity: 0,
        });
        firstChoice = null;
        secondChoice = null;
        cardLeftToMatch = cardLeftToMatch - 1;
        if (cardLeftToMatch === 0) {
          window.alert("bravo vous avez gagné :)");
        }
      } else {
        setTimeout(() => {
          firstChoice.classList.remove("card-emoji");
          secondChoice.classList.remove("card-emoji");
          firstChoice = null;
          secondChoice = null;
        }, 1000);
      }
    }
  });
});

gsap.from(".card", {
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});
