import { numberPatterns } from './numberPatterns.js';

export class Sudoku {
    constructor() {
        this.currentNumberBoardIdx = 0;
        this.numberBoard = this.getNumberBoard();
        this.domBoard = this.getNewDomBoard();
        this.domAccesBoard = [];
        this.fillUpBoard();
        // this.addAlgorithmSpec(this.domBoard);
    }

    getNumberBoard() {
        const currentNumberPattern = numberPatterns[this.currentNumberBoardIdx];
        // Creates numberBoard is a copy of the currentNumberPattern
        const numberBoard = currentNumberPattern.map(function(row) {
            return row.slice();
        });
        return numberBoard;
    }

    getNewDomBoard() {
        const container = document.getElementById("board-container");
        const domBoard = document.createElement("div");
        const domBoardClass = document.createAttribute("class");
        domBoardClass.value = "board";
        domBoard.setAttributeNode(domBoardClass);
        container.appendChild(domBoard);
        return domBoard;
    }

    addAlgorithmSpec(domBoard) {
        const realTimeMeasureText = document.createElement("p");
        realTimeMeasureText.textContent = "realtime needed to complete: ";
        const realTimeMeasure = document.createElement("span");
        realTimeMeasure.textContent = "...";
        realTimeMeasureText.appendChild(realTimeMeasure);
        domBoard.appendChild(realTimeMeasureText);
    }

    fillUpBoard() {
        for (let i = 0; i < 9; i++) {
            const domAccesRow = [];
            const domRow = this.newDomRow();
            for (let j= 0; j < 9; j++) {
                const domCell = this.newDomCell(i, j);
                domAccesRow.push(domCell);
                domRow.appendChild(domCell);
            }
            this.domAccesBoard.push(domAccesRow);
            this.domBoard.appendChild(domRow);
        }
    }

    newDomRow() {
        const domRow = document.createElement("div");
        const newClass = document.createAttribute("class");
        newClass.value = "row";
        domRow.setAttributeNode(newClass);
        return domRow;
    }

    newDomCell(row, col) {
        // Create number within the cell
        const domSpan = document.createElement("span");
        this.setCellText(domSpan, row, col);

        // Create the cell
        const domCell = document.createElement("div");
        const newClass = document.createAttribute("class");
        newClass.value = "cell";
        domCell.setAttributeNode(newClass);
        this.modifyCellBorderColor(domCell, row, col);
        domCell.appendChild(domSpan);
        return domCell;
    }

    setCellText(domSpan, row, col) {
        if (this.numberBoard[row][col] === 0) {
            domSpan.style.color = "transparent";
            domSpan.textContent = "?";
        } else {
            domSpan.style.color = "black";
            domSpan.textContent = String(this.numberBoard[row][col]);
        }
        debugger;
    }

    modifyCellBorderColor(cell, row, col) {
        if (col === 2 || col === 5) {
            cell.style.borderRight = "1px solid black";
        } else if (col === 6 || col === 3) {
            cell.style.borderLeft = "1px solid black";
        }
        if (row === 3 || row === 6) {
            cell.style.borderTop = "1px solid black";
        } else if (row === 2 || row === 5) {
            cell.style.borderBottom = "1px solid black";
        }
    }

    renew() {
        for (let i = 0; i < this.domAccesBoard.length; i++) {
            for (let j = 0; j < this.domAccesBoard[i].length; j++) {
                this.renewCell(i, j);
            }
        }
    }

    renewCell(row, col) {
        const cell = this.domAccesBoard[row][col];
        const cellSpan = cell.querySelector("span");
        this.setCellText(cellSpan, row, col);
    }

    changeCurrentNumberBoard(isIncreasing) {
        if (isIncreasing) {
            this.currentNumberBoardIdx++;
            if (this.currentNumberBoardIdx === numberPatterns.length) {
                this.currentNumberBoardIdx = 0;
            }
        } else {
            this.currentNumberBoardIdx--;
            if (this.currentNumberBoardIdx < 0) {
                this.currentNumberBoardIdx = numberPatterns.length - 1;
            }
        }
        this.numberBoard = this.getNumberBoard();
        this.renew();
    }

    printCell(row, col) {
        const cell = this.domAccesBoard[row][col];
        cell.style.backgroundColor = "red";
    }
}

