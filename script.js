const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const aiToggleButton = document.getElementById('aiToggle');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let againstAI = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
aiToggleButton.addEventListener('click', toggleAI);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || isGameOver) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();

    if (!isGameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (againstAI && currentPlayer === 'O') {
            aiMove();
        }
    }
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            statusText.textContent = `${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        isGameOver = true;
        statusText.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameOver = false;
    statusText.textContent = '';
}

function toggleAI() {
    againstAI = !againstAI;
    aiToggleButton.textContent = `Play Against AI: ${againstAI ? 'On' : 'Off'}`;
    resetGame();
}

function aiMove() {
    const emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    checkWinner();
    if (!isGameOver) {
        currentPlayer = 'X';
    }
}

