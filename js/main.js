import { Sudoku } from './boardCreation/createBoard.js';
import { visualSudokuSolver } from './algorithms/backtracking.js';
const sudoku = new Sudoku();

const arrowBtns = document.getElementById("board-and-buttons").getElementsByClassName("arrow-btn");
const startBtn = document.querySelector(".start");
const instantBtn = document.querySelector(".instant");
const resetBtn = document.querySelector(".reset");

let isTraversing = false;

for (let i = 0; i < arrowBtns.length; i++) {
    if (i === 0) {
        // i === 0 is Left arrow
        arrowBtns[i].addEventListener('click', () => {
            if(!(isTraversing)) {
                sudoku.changeCurrentNumberBoard(false);
            }
        });
    } else {
        arrowBtns[i].addEventListener('click', () => {
            if(!(isTraversing)) {
                sudoku.changeCurrentNumberBoard(true);
            }
        });
    }
}

startBtn.addEventListener('click', async function () {
    addClass([startBtn, instantBtn, resetBtn], ['disabled']);
    isTraversing = true;
    await visualSudokuSolver(matrixCopy(sudoku.numberBoard), true, sudoku.domAccesBoard);
    isTraversing = false;
    removeClass([startBtn, instantBtn, resetBtn], ['disabled']);
});

instantBtn.addEventListener('click', () => {
    if (!(isTraversing)) {
        visualSudokuSolver(matrixCopy(sudoku.numberBoard), false, sudoku.domAccesBoard);
    }
});

resetBtn.addEventListener('click', () => {
    if (!(isTraversing)) {
        sudoku.renew();
    }
});

function matrixCopy(matrix) {
    const copy = matrix.map(function(row) {
        return row.slice();
    });
    return copy;
}

function addClass(elements, classes) {
    for (const element of elements) {
        for (const className of classes) {
            element.classList.add(className);
        }
    }
}

function removeClass(elements, classes) {
    for (const element of elements) {
        for (const className of classes) {
            element.classList.remove(className);
        }
    }
}