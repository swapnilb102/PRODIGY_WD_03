const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.querySelector('#status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart-btn');
const modeSelect = document.querySelector('#mode-select');
let isAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id').split('-')[1]);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (isAI && gameActive && currentPlayer === 'O') {
        handleAIPlay();
    }
}

function handleAIPlay() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    let aiCell = document.getElementById(`cell-${randomIndex}`);
    handleCellPlayed(aiCell, randomIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board.fill('');
    statusDisplay.innerHTML = '';
    cells.forEach(cell => cell.innerHTML = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
modeSelect.addEventListener('change', (event) => {
    isAI = event.target.value === 'ai';
    handleRestartGame();
});
