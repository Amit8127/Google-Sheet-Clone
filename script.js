const headRow = document.getElementById('head-row');
const tableBody = document.getElementById('table-body');
const currCell = document.getElementById('curr-cell');
const boldBtn = document.getElementById('bold-btn');
const cols = 26;
const rows = 100;

var currentCell;

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

function setHeaderColor(colId, rowId) {
    const collHead = document.getElementById(colId);
    const rowHead = document.getElementById(rowId);

    collHead.style.backgroundColor='yellow';
    rowHead.style.backgroundColor='yellow';
}

function focusHandler(cell) {
    currentCell = cell;
    setHeaderColor(cell.id[0], cell.id.substring(1));
    currCell.innerHTML = cell.id+' '+'selected';n
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

