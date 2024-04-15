let squares = [];
let selectedPawn = null;
const numRows = 8;
const numCols = 8;
const squareSize = 60; // Size of each square in pixels

function setup() {
    createCanvas(numCols * squareSize, numRows * squareSize);
    generateChessboard();
    placeRandomPawns(); // Call this function to place random pawns
}

function generateChessboard() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = j * squareSize;
            let y = i * squareSize;
            let isEvenSquare = (i + j) % 2 === 0;
            squares.push(new Square(x, y, squareSize, isEvenSquare));
        }
    }
}

function draw() {
    background(255);
    for (let square of squares) {
        square.display();
    }
}

function mouseClicked() {
    let clickedSquare = getClickedSquare(mouseX, mouseY);

    if (clickedSquare) {
        // If no pawn is selected and the clicked square has a pawn, select it
        if (!selectedPawn && clickedSquare.hasPawn) {
            selectedPawn = clickedSquare;
        }
        // If a pawn is selected and the clicked square is empty, move the pawn
        else if (selectedPawn && !clickedSquare.hasPawn) {
            movePawn(selectedPawn, clickedSquare);
            selectedPawn = null; // Deselect the pawn after moving
        }
    }
}

function movePawn(pawnSquare, targetSquare) {
    targetSquare.hasPawn = true;
    pawnSquare.hasPawn = false;
}

function getClickedSquare(x, y) {
    for (let square of squares) {
        if (square.contains(x, y)) {
            return square;
        }
    }
    return null;
}

class Square {
    constructor(x, y, size, isEven) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.isEven = isEven;
        this.hasPawn = false;
    }

    display() {
        fill(this.isEven ? 240 : 120);
        rect(this.x, this.y, this.size, this.size);
        if (this.hasPawn) {
            fill(0);
            ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2);
        }
    }

    contains(px, py) {
        return px > this.x && px < this.x + this.size && py > this.y && py < this.y + this.size;
    }
}

function placeRandomPawns() {
    let availableSquares = squares.filter(square => !square.hasPawn);
    for (let i = 0; i < 16; i++) {
        if (availableSquares.length > 0) {
            let randomIndex = floor(random(availableSquares.length));
            availableSquares[randomIndex].hasPawn = true;
            availableSquares.splice(randomIndex, 1);
        }
    }
}
