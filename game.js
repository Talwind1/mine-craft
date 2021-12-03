const MATRIX_SIZE = 21;
const board = document.querySelector("#board");

const pickake = document.getElementById("1");
const shovel = document.getElementById("2");
const axe = document.getElementById("3");
const curBox = document.getElementById("curBox");

const types = {
  sky: "sky",
  dirt: "dirt",
  stone: "stone",
  cloud: "cloud",
  leaves: "leaves",
  grass: "grass",
  oak: "oak",
};
const tools = {
  pickake: "pickake",
  shovel: "shovel",
  axe: "axe",
};
let curType;
let curTool;

function game() {
  window.createBoard();
  // window.addEventListener("click", () => {
  //   console.log(`${curTool} ${curType}`);
  // });
}

function createBoard() {
  let matrix = [];
  for (let i = 0; i < MATRIX_SIZE; i++) {
    for (let j = 0; j < MATRIX_SIZE; j++) {
      let gameElement = document.createElement("div");
      gameElement.setAttribute("data-i", i);
      gameElement.setAttribute("data-j", j);

      const type = drawType(gameElement);

      gameElement.classList.add(type);

      board.appendChild(gameElement);
    }
  }
}

function drawType(element) {
  const i = element.getAttribute("data-i");
  const j = element.getAttribute("data-j");
  let type;
  if (i > 13) {
    type = types.dirt;
  } else if (i == 13) {
    type = types.grass;
  } else if (i < 13 && i > 9 && j > 16 && j < 18) {
    //little wood
    type = types.oak;
  } else if (
    (i < 10 && i > 6 && j > 15 && j < 19) ||
    (i == 12 && j > 3 && j < 7) ||
    (i == 11 && j == 5)
  ) {
    //little tree
    type = types.leaves;
  } else if (
    (i == 7 && j > 3 && j < 10) ||
    (i == 6 && j > 4 && j < 9) ||
    (i == 5 && j > 3 && j < 6)
  ) {
    type = types.cloud;
  } else if (i == 12 && (j == 20 || j == 19 || j == 15)) {
    type = types.stone;
  } else {
    type = types.sky;
  }

  return type;
}

board.addEventListener("click", (e) => {
  let element = e.target;
  let type = e.target.getAttribute("class");

  curType = type;

  switch (type) {
    case types["stone"]:
      if (curTool === tools["pickake"]) {
        element.classList = "";
        element.classList.add(types["sky"]);
      }
      curBox.classList.add(type);
      break;
    case types["oak"]:
      if (curTool === tools["axe"]) {
        element.classList = "";
        element.classList.add(types["sky"]);
        curBox.classList = "";
        curBox.classList.add(type);
      }
      break;
    case types["leaves"]:
      if (curTool === tools["axe"]) {
        element.classList = "";
        element.classList.add(types["sky"]);
        curBox.classList = "";
        curBox.classList.add(type);
      }
      break;
    case types["dirt"]:
      if (curTool === tools["shovel"]) {
        element.classList = "";
        element.classList.add(types["sky"]);
        curBox.classList = "";
        curBox.classList.add(type);
      }
      break;
    case types["grass"]:
      if (curTool === tools["shovel"]) {
        element.classList = "";
        element.classList.add(types["sky"]);
        curBox.classList = "";
        curBox.classList.add(type);
      }
      break;
  }
});

axe.addEventListener("click", () => {
  curTool = "axe";
});

shovel.addEventListener("click", () => {
  curTool = "shovel";
});

pickake.addEventListener("click", () => {
  curTool = "pickake";
});

game();
