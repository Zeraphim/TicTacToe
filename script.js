let board = [
    [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
];

let gameOver = false;

let currentBoardIndex = board.length - 1;

// Get the tictactoe_layout div
let tictactoe = document.getElementById('tictactoe_layout');

// Get status text
let statusText = document.getElementById('statusText');

let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

// let boardIndex = 1;

// Keep track of the current player
let currentPlayer = 'O';

function drawBoard() {
    // Clear the previous board
    tictactoe.innerHTML = '';

    // Get the latest board state
    let latestBoard = board[currentBoardIndex];

    // Iterate over the latest board array
    for (let i = 0; i < latestBoard.length; i++) {
        for (let j = 0; j < latestBoard[i].length; j++) {

            // Create a new div
            let cell = document.createElement('div');

            // Add Tailwind CSS classes to the div
            cell.classList.add('h-[17vh]', 'w-[17vh]', 'text-center', 'flex', 'flex-row', 'justify-center', 'items-center');

            // Add border classes based on the position of the cell
            if (j === 0) {
                // First cell in the row
                if (i === latestBoard.length - 1) {
                    cell.classList.add('border-r-[3px]', 'border-gray-500');
                } else {
                    cell.classList.add('border-r-[3px]', 'border-b-[3px]', 'border-gray-500');
                }
            } else if (j === latestBoard[i].length - 1) {
                // Last cell in the row
                if (i === latestBoard.length - 1) {
                    cell.classList.add('border-l-[3px]', 'border-gray-500');
                } else {
                    cell.classList.add('border-l-[3px]', 'border-b-[3px]', 'border-gray-500');
                }
            } else {
                // Middle cells
                if (i === latestBoard.length - 1) {
                    cell.classList.add('border-l-[3px]', 'border-r-[3px]', 'border-gray-500');
                } else {
                    cell.classList.add('border-l-[3px]', 'border-r-[3px]', 'border-b-[3px]', 'border-gray-500');
                }
            }

            // Adding Tailwind styles depending on the value of the board array 'X' or 'O'
            if (latestBoard[i][j] == "X") {
                cell.classList.add('text-green-500' , 'font-bold', 'text-[4rem]');
            } else {
                cell.classList.add('text-orange-500' , 'font-bold', 'text-[4rem]');
            }

            // Set the text of the div to the value from the latest board array
            cell.textContent = latestBoard[i][j];

            // Add an event listener to the div
            cell.addEventListener('click', function() {
                if (!gameOver && latestBoard[i][j] === ' ') {

                    newMove = makeMove(i, j, currentPlayer, latestBoard);
                    
                    console.log(`BOARD INDEX: ${currentBoardIndex}`);
                    console.log(`LATEST BOARD: ${latestBoard}`);

                    // Check if the current player has won
                    let winner = checkWinner(newMove);
                    if (winner) {

                        console.log(board);

                        // Remove the 'hidden' class from the buttons
                        prevBtn.classList.remove('hidden');
                        nextBtn.classList.remove('hidden');

                        statusText.classList.add('font-bold', 'text-center', 'text-cyan-500');

                        if (winner === 'draw') {
                            statusText.textContent = `It's a draw !!!`;
                        } else {
                            statusText.textContent = `Player ${winner} wins the game !!!`;
                        }
                        gameOver = true;

                        console.log(`Board Length: ${board.length - 1}`);

                        console.log(`Current Board Index: ${currentBoardIndex}`);

                        console.log(`GAME STATUS: ${gameOver}`)
                    } else {
                        // Switch the current player

                        console.log(board);

                        console.log(`Board Length: ${board.length - 1}`);

                        console.log(`Current Board Index: ${currentBoardIndex}`);

                        console.log(`GAME STATUS: ${gameOver}`)

                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                        statusText.textContent = `Player ${currentPlayer}'s turn`;
                    }


                    

                    // Redraw the board
                    drawBoard();
                }
            });

            // Add the div to the tictactoe_layout div
            tictactoe.appendChild(cell);
        }
    }
}


function makeMove(row, col, player) {
    // Create a new board state based on the current one
    let newBoard = JSON.parse(JSON.stringify(board[currentBoardIndex]));

    // Apply the move to the new board state
    newBoard[row][col] = player;

    // Add the new board state to the board array
    board.push(newBoard);

    // Update the current board index
    currentBoardIndex = board.length - 1;

    return newBoard
}

// Draw the initial board
drawBoard();


// A function to check the winner for every move made
function checkWinner(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i];
        }
    }

    // Check diagonals
    if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // Check if the board is full
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === ' ') {
                // The board is not full
                return null;
            }
        }
    }

    return 'draw';
}



// ====================== RESET BTN ======================
let resetBtn = document.getElementById('resetBtn');

// Add an event listener to the reset button
resetBtn.addEventListener('click', function() {
    // Reset the board array to its original state
    board = [
        [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
    ];

    statusText.textContent = `Player O's turn`;
    statusText.classList.remove('font-bold', 'text-center', 'text-cyan-500');

    gameOver = false;
    currentBoardIndex = board.length - 1;

    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');

    // Redraw the board
    drawBoard();
});


// ====================== PREV and NEXT BTN ======================

prevBtn.addEventListener('click', function() {
    if (gameOver === true && currentBoardIndex > 0) {
        
        currentBoardIndex--;

        console.log(`PREV: Move Iter ${currentBoardIndex}`);
        drawBoard();
    }
});

nextBtn.addEventListener('click', function() {
    if (gameOver === true && currentBoardIndex < board.length - 1) {
        
        currentBoardIndex++;

        console.log(`NEXT: Move Iter ${currentBoardIndex}`);

        drawBoard();
    }
});