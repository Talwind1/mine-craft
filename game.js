const MATRIX_SIZE = 21;
const board = document.querySelector("#board");

const pickake = document.getElementById("pickake");
const shovel = document.getElementById("shovel");
const axe = document.getElementById("axe");
const curBox = document.getElementById("inventory-collection");

let curTool;

const inventory = document.querySelector("#inventory");

const types = {
  sky: "sky",
  dirt: "dirt",
  stone: "stone",
  cloud: "cloud",
  leaves: "leaves",
  grass: "grass",
  oak: "oak",
};

const changeable = {
  sky: "sky",
  cloud: "cloud",
};
const tools = {
  pickake: "pickake",
  shovel: "shovel",
  axe: "axe",
};

const matches = {
  pickake: [types["stone"]],
  shovel: [types["dirt"]],
  axe: [types["oak"], types["leaves"]],
};

function game() {
  window.createBoard();
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

  removePart(element, type);
  addToInventory(type);
});

function removePart(element, type) {
  if (matches[curTool].includes(type)) {
    element.classList = "";
    element.setAttribute("class", types["sky"]);
  }
  //
  // else {
  //   let tool = document.querySelector(tools[curTool]);
  //   console.log(tool);
  //   tool.classList.toggle("red");
  //add red class!
  //   setTimeout(() => {
  //     tool.classList.toggle("red"); // open red class
  //   }, 200);
  // }

  function removeElement(element) {
    element.classList = "";
    element.classList.add(types["sky"]);
  }
}

function addToInventory(type) {
  inventory.classList = "";
  inventory.classList.add(type);
}

axe.addEventListener("click", () => {
  curTool = "axe";
});

shovel.addEventListener("click", () => {
  curTool = "shovel";
});

pickake.addEventListener("click", () => {
  curTool = "pickake";
});

inventory.addEventListener("click", (e) => {
  if (e.target.classList) {
    board.addEventListener("click", addPart);
  }
});

function addPart(e) {
  let element = e.target;
  let type = e.target.getAttribute("class");
  if (type === types["sky"]) {
    element.classList = "";
    element.classList.add(inventory.getAttribute("class"));
  }
}

game();
