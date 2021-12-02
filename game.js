const MATRIX_SIZE = 21;
let board = document.querySelector("#board");
const materials = {
  sky: "blue",
  dirt: "brown",
  stone: "grey",
  cloud: "white",
  leaves: "green",
  grass: "half",
  oak: "brown2",
};

function createBoard() {
  let matrix = [];
  for (let i = 0; i < MATRIX_SIZE; i++) {
    for (let j = 0; j < MATRIX_SIZE; j++) {
      let gameElement = document.createElement("div");
      gameElement.setAttribute("data-i", i);
      gameElement.setAttribute("data-j", j);
      gameElement.classList.add("gameElement");

      const type = chooseType(gameElement);

      gameElement.classList.add(type);

      board.appendChild(gameElement);
    }
  }
}
window.createBoard();

function chooseType(element) {
  const i = element.getAttribute("data-i");
  const j = element.getAttribute("data-j");
  let type;
  if (i > 13) {
    type = materials.dirt;
  } else if (i == 13) {
    type = materials.grass;
  } else if (i < 13 && i > 9 && j > 16 && j < 18) {
    //little wood
    type = materials.oak;
  } else if (
    (i < 10 && i > 6 && j > 15 && j < 19) ||
    (i == 12 && j > 3 && j < 7) ||
    (i == 11 && j == 5)
  ) {
    //little tree
    type = materials.leaves;
  } else if (
    (i == 7 && j > 3 && j < 10) ||
    (i == 6 && j > 4 && j < 9) ||
    (i == 5 && j > 3 && j < 6)
  ) {
    type = materials.cloud;
  } else if (i == 12 && (j == 20 || j == 19 || j == 15)) {
    type = materials.stone;
  } else {
    type = materials.sky;
  }

  return type;
}

let elements = document.querySelectorAll(".gameElement");

function getPlace() {
  elements.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element);
    });
  });
}

getPlace();
function removeClass() {
  window.addEventListener("click", (e) => {
    e.target;
  });
}
