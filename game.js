const MATRIX_SIZE = 21;
const board = document.querySelector("#board");
const pickaxe = document.getElementById("pickaxe");
const shovel = document.getElementById("shovel");
const axe = document.getElementById("axe");
const play = document.querySelector("#play");
const restart = document.querySelector("#restart");
const inventory = document.querySelector("#inventory");
let curTool;
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
  pickaxe: "pickaxe",
  shovel: "shovel",
  axe: "axe",
};

const matches = {
  pickaxe: [types["stone"]],
  shovel: [types["dirt"], types["grass"]],
  axe: [types["oak"], types["leaves"]],
};

play.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none";
});

restart.addEventListener("click", () => {
  board.innerHTML = "";
  createBoard();
});

function game() {
  window.createBoard();
}

function createBoard() {
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
  console.log();
  let element = e.target;
  let type = e.target.getAttribute("class");

  if (isMatch(element, type)) {
    addToInventory(type);
    removePart(element, type);
  } else {
    let tool = tools[curTool.toString()];
    tool = document.getElementById(tool);
    tool.classList.add("red");
    setTimeout(() => tool.classList.remove("red"), 400);
  }
});

function isMatch(element, type) {
  if (curTool) {
    return matches[curTool].includes(type);
  } else return false;
}

function removePart(element, type) {
  element.classList = "";
  element.setAttribute("class", types["sky"]);
}

function addToInventory(type) {
  inventory.classList = "";
  inventory.classList.add(type);
}

axe.addEventListener("click", () => {
  board.removeEventListener("click", addPart);
  curTool = tools["axe"];
  axe.classList.add("blue");
  shovel.classList.remove("blue");
  pickaxe.classList.remove("blue");
});

shovel.addEventListener("click", (e) => {
  board.removeEventListener("click", addPart);
  curTool = tools["shovel"];
  axe.classList.remove("blue");
  shovel.classList.add("blue");
  pickaxe.classList.remove("blue");
});

pickaxe.addEventListener("click", () => {
  board.removeEventListener("click", addPart);
  curTool = tools["pickaxe"];
  axe.classList.remove("blue");
  shovel.classList.remove("blue");
  pickaxe.classList.add("blue");
});

inventory.addEventListener("click", (e) => {
  if (e.target.classList) {
    board.addEventListener("click", addPart);
  }
});

function addPart(e) {
  let element = e.target;
  let type = element.getAttribute("class");
  if (type === types["sky"] || type === types["cloud"]) {
    element.classList = "";
    element.classList.add(inventory.getAttribute("class"));
    inventory.classList = "";
  }
  board.removeEventListener("click", addPart);
}

game();
