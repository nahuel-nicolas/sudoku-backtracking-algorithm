function sleep(ms=0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function visualSudokuSolver(board, isAsync=false, domBoard=null) {
    const emptyCellPosition = await findNextEmptyCell(board, domBoard, isAsync);
    let row, col;
    if (emptyCellPosition === null) {
        return true;
    } else {
        row = emptyCellPosition[0];
        col = emptyCellPosition[1]
    }
    for (let currentNumber = 1; currentNumber < 10; currentNumber++) {
        if (await validNumberToAdd(board, currentNumber, emptyCellPosition, domBoard, isAsync)) {
            board[row][col] = currentNumber;
            if (await visualSudokuSolver(board, isAsync, domBoard)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

async function findNextEmptyCell(board, domBoard, isAsync) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(isAsync) await sleep();
            if (board[i][j] === 0){ 
                return [i, j];
            }
        }
    }
    return null;
}

async function validNumberToAdd(board, number, position, domBoard, isAsync) {
    const row = position[0];
    const col = position[1];
    if (domBoard) addTemporalNumberToEmptyCell(domBoard[row][col], number);
    for (let i = 0; i < board[row].length; i++) {
        if(isAsync) await sleep();
        if (sameNumberInCurrentRow(board, row, col, i, number)) {
            return false;
        }
    }

    for (let i = 0; i < board.length; i++) {
        if(isAsync) await sleep();
        if (sameNumberInCurrentCol(board, row, col, i, number)) {
            return false;
        }
    }

    if (await sameNumberInCurrentThreeSquareBox(board, row, col, number, isAsync)) {
        return false;
    }

    return true;
}

// Find Helpers

function sameNumberInCurrentRow(board, row, col, i, number) {
    return board[row][i] === number && col !== i;
}

function sameNumberInCurrentCol(board, row, col, i, number) {
    return board[i][col] === number && row !== i;
}

async function sameNumberInCurrentThreeSquareBox(board, position, number, isAsync) {
    const rowsRange = Math.floor(position[0] / 3);
    const colsRange = Math.floor(position[1] / 3);
    for (let i = rowsRange * 3; i < rowsRange * 3 + 3; i++) {
        for (let j = colsRange * 3; j < colsRange * 3 + 3; j++) {
            if(isAsync) await sleep();
            if (board[i][j] === number && [i, j] !== position) {
                return true;
            }
        }
    }
    return false;
}

// Visual helpers
function printCurrentCell(cell, color="blue") {
    cell.style.backgroundColor = color;
    cell.style.color = "white";
}

function unPrintCurrentCell(cell) {
    cell.style.backgroundColor = "white";
    cell.style.color = "black";
}

function addTemporalNumberToEmptyCell(cell, number) {
    const cellSpan =  cell.querySelector("span");
    cellSpan.textContent = String(number);
    cellSpan.style.color = "red";
}

function printRow(row, color="grey") {
    for (let col = 0; col < row.length; col++) {
        printCurrentCell(row[col], color);
    }
}

function unprintRow(row) {
    for (let col = 0; col < row.length; col++) {
        unPrintCurrentCell(row[col]);
    }
}