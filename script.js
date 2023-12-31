// dimensions
const COLS = 26;
const ROWS = 100;

// constants
const transparent = "transparent";
const transparentBlue = "#ddddff";
const arrMatrix = "arrMatrix";

// table components
const tHeadRow = document.getElementById("table-heading-row");
const tBody = document.getElementById("table-body");
const currentCellHeading = document.getElementById("current-cell");
const sheetNo = document.getElementById("sheet-no");
const buttonContainer = document.getElementById("button-container");

// excel buttons
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");
const leftBtn = document.getElementById("left-btn");
const centerBtn = document.getElementById("center-btn");
const rightBtn = document.getElementById("right-btn");
const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");
const uploadInput = document.getElementById("upload-input");
const addSheetBtn = document.getElementById("add-sheet-btn");
const saveSheetBtn = document.getElementById("save-sheet-btn");

// dropdown
const fontStyleDropdown = document.getElementById("font-style-dropdown");
const fontSizeDropdown = document.getElementById("font-size-dropdown");

// input tags
const bgColorInput = document.getElementById("bgColor");
const fontColorInput = document.getElementById("fontColor");

// cache
let currentCell;
let previousCell;
let cutCell; // this cutCell will store my cell data;
let lastPressBtn;
let matrix = new Array(ROWS);
let numSheets = 1; // size
let currentSheet = 1; // index
let prevSheet;

function createNewMatrix() {
  for (let row = 0; row < ROWS; row++) {
    matrix[row] = new Array(COLS);
    for (let col = 0; col < COLS; col++) {
      matrix[row][col] = {};
    }
  }
}
// this is creating matrix for the first time
createNewMatrix();

function colGen(typeOfCell, tableRow, isInnerText, rowNumber) {
  for (let col = 0; col < COLS; col++) {
    const cell = document.createElement(typeOfCell);
    if (isInnerText) {
      cell.innerText = String.fromCharCode(col + 65);
      cell.setAttribute("id", String.fromCharCode(col + 65));
    } else {
      cell.setAttribute("id", `${String.fromCharCode(col + 65)}${rowNumber}`);
      cell.setAttribute("contenteditable", true);
      cell.addEventListener("input", updateObjectInMatrix);
      cell.addEventListener("focus", (event) => focusHandler(event.target));
    }
    tableRow.append(cell);
  }
}
// this is for heading
colGen("th", tHeadRow, true);
function updateObjectInMatrix() {
  let id = currentCell.id;
  let col = id[0].charCodeAt(0) - 65;
  let row = id.substring(1) - 1;
  matrix[row][col] = {
    text: currentCell.innerText,
    style: currentCell.style.cssText,
    id: id,
  };
}

function setHeaderColor(colId, rowId, color) {
  const colHead = document.getElementById(colId);
  const rowHead = document.getElementById(rowId);
  colHead.style.backgroundColor = color;
  rowHead.style.backgroundColor = color;
}

function downloadMatrix() {
  // 2d matrix into a memory that's accessible outside
  const matrixString = JSON.stringify(matrix);
  const blob = new Blob([matrixString], { type: "application/json" });
  console.log(blob);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "table.json";
  link.click();
}

function uploadMatrix(event) {
  const file = event.target.files[0];
  // FileReader helps me to read my blod
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file);
    // readAsText will trigger onload method
    // of reader instance
    reader.onload = function (event) {
      const fileContent = JSON.parse(event.target.result);
      // update virtual memory
      matrix = fileContent;
      renderMatrix();
    };
  }
}

uploadInput.addEventListener("input", uploadMatrix);

function buttonHighlighter(button, styleProperty, style) {
  if (currentCell.style[styleProperty] === style) {
    button.style.backgroundColor = transparentBlue;
  } else {
    button.style.backgroundColor = transparent;
  }
}

function focusHandler(cell) {
  // console.log(cell.style);
  currentCell = cell;
  if (previousCell) {
    // set header colors as transparent
    setHeaderColor(
      previousCell.id[0],
      previousCell.id.substring(1),
      transparent
    );
  }
  buttonHighlighter(boldBtn, "fontWeight", "bold");
  buttonHighlighter(italicsBtn, "fontStyle", "italic");
  buttonHighlighter(underlineBtn, "textDecoration", "underline");
  setHeaderColor(cell.id[0], cell.id.substring(1), transparentBlue);
  currentCellHeading.innerText = cell.id;
  previousCell = currentCell;
}

function tableBodyGen() {
  // cleanup my table body
  tBody.innerHTML = "";
  for (let row = 1; row <= ROWS; row++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.innerText = row;
    th.setAttribute("id", row);
    tr.append(th);
    colGen("td", tr, false, row);
    tBody.append(tr);
  }
}
tableBodyGen();

if (localStorage.getItem(arrMatrix)) {
  matrix = JSON.parse(localStorage.getItem(arrMatrix))[0];
  renderMatrix();
}

boldBtn.addEventListener("click", () => {
  if (currentCell.style.fontWeight === "bold") {
    currentCell.style.fontWeight = "normal";
    boldBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.fontWeight = "bold";
    boldBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

italicsBtn.addEventListener("click", () => {
  if (currentCell.style.fontStyle === "italic") {
    currentCell.style.fontStyle = "normal";
    italicsBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.fontStyle = "italic";
    italicsBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

underlineBtn.addEventListener("click", () => {
  if (currentCell.style.textDecoration === "underline") {
    currentCell.style.textDecoration = "none";
    underlineBtn.style.backgroundColor = transparent;
  } else {
    currentCell.style.textDecoration = "underline";
    underlineBtn.style.backgroundColor = transparentBlue;
  }
  updateObjectInMatrix();
});

leftBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "left";
  updateObjectInMatrix();
});

rightBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "right";
  updateObjectInMatrix();
});

centerBtn.addEventListener("click", () => {
  currentCell.style.textAlign = "center";
  updateObjectInMatrix();
});

fontStyleDropdown.addEventListener("change", () => {
  currentCell.style.fontFamily = fontStyleDropdown.value;
  updateObjectInMatrix();
});

fontSizeDropdown.addEventListener("change", () => {
  currentCell.style.fontSize = fontSizeDropdown.value;
  updateObjectInMatrix();
});

bgColorInput.addEventListener("input", () => {
  currentCell.style.backgroundColor = bgColorInput.value;
  updateObjectInMatrix();
});

fontColorInput.addEventListener("input", () => {
  currentCell.style.color = fontColorInput.value;
  updateObjectInMatrix();
});

cutBtn.addEventListener("click", () => {
  lastPressBtn = "cut";
  cutCell = {
    text: currentCell.innerText,
    style: currentCell.style.cssText,
  };
  currentCell.innerText = "";
  currentCell.style.cssText = "";
  updateObjectInMatrix();
});

copyBtn.addEventListener("click", () => {
  lastPressBtn = "copy";
  cutCell = {
    text: currentCell.innerText,
    style: currentCell.style.cssText,
  };
});

pasteBtn.addEventListener("click", () => {
  currentCell.innerText = cutCell.text;
  currentCell.style = cutCell.style;
  if (lastPressBtn === "cut") {
    cutCell = undefined;
  }
  updateObjectInMatrix();
});

function genNextSheetButton() {
  const btn = document.createElement("button");
  numSheets++;
  currentSheet = numSheets;
  btn.innerText = `Sheet ${currentSheet}`;
  btn.setAttribute("id", `sheet-${currentSheet}`);
  btn.setAttribute("onclick", "viewSheet(event)");
  btn.setAttribute("class", "sheetNo");
  buttonContainer.append(btn);
}

addSheetBtn.addEventListener("click", () => {
  genNextSheetButton();
  sheetNo.innerText = `Sheet No - ${currentSheet}`;
  // add nextSheetButton
  // Save Matrix -> ✅
  saveMatrix();
  // clean matrix -> ✅
  createNewMatrix(); // it's creating matrix again (sort of used as cleaner fn)
  // clean html
  tableBodyGen();
});

function saveMatrix() {
  if (localStorage.getItem(arrMatrix)) {
    // pressing add sheet not for the first time
    let tempArrMatrix = JSON.parse(localStorage.getItem(arrMatrix));
    tempArrMatrix.push(matrix);
    localStorage.setItem(arrMatrix, JSON.stringify(tempArrMatrix));
  } else {
    // pressing add sheet for the first time
    let tempArrMatrix = [matrix];
    localStorage.setItem(arrMatrix, JSON.stringify(tempArrMatrix));
  }
}

function renderMatrix() {
  matrix.forEach((row) => {
    row.forEach((cellObj) => {
      if (cellObj.id) {
        let currentCell = document.getElementById(cellObj.id);
        currentCell.innerText = cellObj.text;
        currentCell.style = cellObj.style;
      }
    });
  });
}

function viewSheet(event) {
  // save prev sheet before doing anything
  prevSheet = currentSheet;
  currentSheet = event.target.id.split("-")[1];
  let matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
  // save my matrix in local storage
  matrixArr[prevSheet - 1] = matrix;
  localStorage.setItem(arrMatrix, JSON.stringify(matrixArr));

  // I have updated my virtual memory
  matrix = matrixArr[currentSheet - 1];
  // clean my html table
  tableBodyGen();
  // render the matrix in html
  renderMatrix();
}
