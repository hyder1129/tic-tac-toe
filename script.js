const board = document.getElementById("board");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            showResult("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function showResult(message) {
    resultElement.innerText = message;
    setTimeout(() => {
        resetGame();
    }, 1500);
}

function updateBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = gameBoard[i];
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    resultElement.innerText = "";
    updateBoard();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

// Initial board setup
updateBoard();
