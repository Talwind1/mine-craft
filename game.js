const MATRIX_SIZE = 21;
const board = document.querySelector("#board");
const sideBar = document.getElementById("side-bar");
const pickake = document.getElementById("1");
const shovel = document.getElementById("2");
const axe = document.getElementById("3");
const materials = {
  sky: "sky",
  dirt: "dirt",
  stone: "stone",
  cloud: "cloud",
  leaves: "leaves",
  grass: "grass",
  oak: "oak",
};
const tools = {
  pickake: false,
  shovel: false,
  axe: false,
};

const types = {
  sky: false,
  dirt: false,
  stone: false,
  cloud: false,
  leaves: false,
  grass: false,
  oak: false,
};

function game() {
  window.createBoard();
  removePart();
}

function createBoard() {
  let matrix = [];
  for (let i = 0; i < MATRIX_SIZE; i++) {
    for (let j = 0; j < MATRIX_SIZE; j++) {
      let gameElement = document.createElement("div");
      gameElement.setAttribute("data-i", i);
      gameElement.setAttribute("data-j", j);

      const type = chooseType(gameElement);

      gameElement.classList.add(type);

      board.appendChild(gameElement);
    }
  }
}

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

function removePart() {
  board.addEventListener("click", (e) => {
    let type = e.target.getAttribute("class");
    console.log(type);
    //updateType(type);
    //change*********
    //  game.classList = "";
    //  game.classList.add("blue");
  });
}

axe.addEventListener("click", () => {
  refreshTools();
  tools["axe"] = true;
  console.log(tools);
});

shovel.addEventListener("click", () => {
  refreshTools();
  tools["shovel"] = true;
  console.log(tools);
});

pickake.addEventListener("click", () => {
  refreshTools();
  tools["pickake"] = true;
  console.log(tools);
});

function refreshTools() {
  tools["axe"] = false;
  tools["pickake"] = false;
  tools["shovel"] = false;
}
game();
