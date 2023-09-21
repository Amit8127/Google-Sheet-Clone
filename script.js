const headRow = document.getElementById('head-row');
const tableBody = document.getElementById('table-body');
const currCell = document.getElementById('curr-cell');
const boldBtn = document.getElementById('bold-btn');
const itBtn = document.getElementById('it-btn');
const udBtn = document.getElementById('ud-btn');
const leftBtn = document.getElementById('left-btn');
const centerBtn = document.getElementById('center-btn');
const rightBtn = document.getElementById('right-btn');
const fontStyle = document.getElementById('font-style');
const fontSize = document.getElementById('font-size');
const bgColor = document.getElementById('bgColor');
const fontColor = document.getElementById('fontColor');
const cols = 26;
const rows = 100;

var preCell;
var currentCell;
var transparent = 'transparent';

function colGen(cellType, tableRow, isInnerText, rowNumber) {
    for(let col = 0; col < 26; col++) {
        var cell = document.createElement(cellType);

        if(isInnerText) {
            cell.innerHTML = String.fromCharCode(col + 65);
            cell.setAttribute('id', String.fromCharCode(col + 65));
        } else {
            cell.setAttribute('id',`${String.fromCharCode(col + 65)}${rowNumber}`); // getting cell value
            cell.setAttribute('contenteditable', true); // for making cell editable
            cell.addEventListener('focus', (event) => focusHandler(event.target)); // event.target is my current cell
        }
        tableRow.append(cell);
    }
}

// this is for headings
colGen('th', headRow, true);

function setHeaderColor(colId, rowId, colour) {
    const collHead = document.getElementById(colId);
    const rowHead = document.getElementById(rowId);

    collHead.style.backgroundColor=colour;
    rowHead.style.backgroundColor=colour;
}

//complete the code below
function buttonHighlighter(button, styleProperty, style) {
    if(currentCell.style[styleProperty] === style) {
        button.style.backgroundColor = 'yellow';
    } else {
        button.style.backgroundColor = transparent;
    }
}

function focusHandler(cell) {
    currentCell = cell;
    

    if(preCell) {
        setHeaderColor(preCell.id[0], preCell.id.substring(1), transparent);
    }
    
    // if(currentCell.style.fontWeight === 'bold') {
    //     boldBtn.style.backgroundColor='yellow';
    // } else {
    //     boldBtn.style.backgroundColor=transparent;
    // }

    // if(currentCell.style.fontStyle === 'italic') {
    //     itBtn.style.backgroundColor='yellow';
    // } else {
    //     itBtn.style.backgroundColor=transparent;
    // }

    // if(currentCell.style.textDecoration === 'underline') {
    //     itBtn.style.backgroundColor='yellow';
    // } else {
    //     itBtn.style.backgroundColor=transparent;
    // }
    buttonHighlighter(boldBtn, 'fontWeight', 'bold');
    buttonHighlighter(itBtn, 'fontStyle', 'italic');
    buttonHighlighter(udBtn, 'textDecoration', 'underline');


    setHeaderColor(cell.id[0], cell.id.substring(1), "yellow");
    currCell.innerHTML = cell.id+' '+'selected';

    preCell = currentCell;
}

for(let row = 1; row <= rows; row++) {
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = row;
    th.setAttribute('id', row);
    tr.append(th);

    // this is for cells
    colGen('td', tr, false, row);
    tableBody.append(tr);
}

boldBtn.addEventListener('click', () => {
    if(currentCell.style.fontWeight === 'bold') {
        currentCell.style.fontWeight = 'normal';
        boldBtn.style.backgroundColor=transparent;
    } else {
        currentCell.style.fontWeight = 'bold';
        boldBtn.style.backgroundColor='yellow';
    }
});

itBtn.addEventListener('click', ()=> {
    if(currentCell.style.fontStyle === 'italic') {
        currentCell.style.fontStyle = 'normal';
        itBtn.style.backgroundColor=transparent;
    } else {
        currentCell.style.fontStyle = 'italic';
        itBtn.style.backgroundColor='yellow';
    }
});

udBtn.addEventListener('click', () => {
    if(currentCell.style.textDecoration === 'underline') {
        currentCell.style.textDecoration = 'none';
        udBtn.style.backgroundColor=transparent;
    } else {
        currentCell.style.textDecoration = 'underline';
        udBtn.style.backgroundColor='yellow';
    }
});

leftBtn.addEventListener('click', ()=> {
    currentCell.style.textAlign='left';
});

centerBtn.addEventListener('click', ()=> {
    currentCell.style.textAlign='center';
});

rightBtn.addEventListener('click', ()=> {
    currentCell.style.textAlign='right';
});

fontStyle.addEventListener('change', ()=>{
    currentCell.style.fontFamily = fontStyle.value;
});

fontSize.addEventListener('change', ()=>{
    currentCell.style.fontSize = fontSize.value;
});

bgColor.addEventListener('input', ()=>{
    currentCell.style.backgroundColor = bgColor.value;
});

fontColor.addEventListener('input', ()=>{
    currentCell.style.color = fontColor.value;
});