// INITIAL DATA
let block = {
  a1: "",
  a2: "",
  a3: "",

  b1: "",
  b2: "",
  b3: "",

  c1: "",
  c2: "",
  c3: "",
};

let player = "";
let warning = "";
let playing = false;
reset();
// EVENTS
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

// FUNCTIONS
function itemClick(e) {
  let item = e.target.getAttribute("data-item");
  if (block[item] === "" && playing) {
    block[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset() {
  warning = "";
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "x" : "o";

  for (let i in block) {
    block[i] = "";
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderInfo() {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
}

function renderSquare() {
  for (let i in block) {
    console.log("ITEM:", i);
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = block[i];
  }
  checkGame();
}
function togglePlayer() {
  player = player === "x" ? "o" : "x";
  renderInfo();
}
function checkGame() {
  if (checkWinnerFor("x")) {
    console.log("x");
    warning = "X Wins!";
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = "O Wins!";
    playing = false;
  } else if (isFull()) {
    warning = "Draw";
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",

    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",

    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(","); //a1, a2, a3

    let hasWon = pArray.every((option) => block[option] === player);

    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let i in block) {
    if (block[i] === "") {
      return false;
    }
  }

  return true;
}
