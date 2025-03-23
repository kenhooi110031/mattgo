// Core game functionality

// Game state variables
let currentBoardSize = 9;
let game;
let currentTurn = "black"; // Start with black
let isUndoOperation = false;

// Initialize the game
function initializeGame() {
    // Create new board element
    const boardContainer = document.getElementById("board-container");
    boardContainer.innerHTML = `
<div class="tenuki-board" data-include-coordinates="true"></div>
`;

    const boardElement = boardContainer.querySelector(".tenuki-board");

    // Initialize new game instance
    game = new tenuki.Game({
        element: boardElement,
        boardSize: currentBoardSize,
        komi: 6.5,
        scoring: "area",
        fuzzyStonePlacement: false
    });

    // Reset turn to black
    currentTurn = "black";
    updateTurnIndicator();

    // Update active button state
    document.querySelectorAll('.board-size-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`size-${currentBoardSize}`).classList.add('active');

    // Add callback to log moves and update turn
    game.callbacks.postRender = function () {
        // Skip sending logs if this is from an undo operation
        if (isUndoOperation) {
            console.log("[Game State] Skipping log during undo operation");
            return;
        }

        const state = game.currentState();

        if (state.pass) {
            const logMessage = state.color.toUpperCase() + " passed";
            console.log("[Move] " + logMessage);

            // Update turn after pass
            currentTurn = state.color === "black" ? "white" : "black";
            updateTurnIndicator();

            fetch('/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: logMessage
            });
        }

        if (state.playedPoint) {
            const boardSize = game.boardSize;
            const x = state.playedPoint.x;
            const y = boardSize - 1 - state.playedPoint.y;  // Flip Y-axis

            const letters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
            const rowNumber = y + 1;
            const columnLetter = letters[x];

            const logMessage = state.color.toUpperCase() + " played " + columnLetter + rowNumber;
            console.log("[Move] " + logMessage);

            // Update turn after move
            currentTurn = state.color === "black" ? "white" : "black";
            updateTurnIndicator();

            fetch('/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: logMessage
            });
        }

        // After any move, notify AI system to check if it's AI's turn
        setTimeout(checkAITurn, 1000);
    };
}

function updateTurnIndicator() {
    const blackIndicator = document.getElementById('black-indicator');
    const whiteIndicator = document.getElementById('white-indicator');

    if (currentTurn === "black") {
        blackIndicator.style.display = "block";
        whiteIndicator.style.display = "none";
    } else {
        blackIndicator.style.display = "none";
        whiteIndicator.style.display = "block";
    }
}

// Game action handlers
function showScore() {
    if (game.isOver()) {
        const score = game.score();
        console.log("[Score] Black: " + score.black.toFixed(1) + ", White: " + score.white.toFixed(1));

        // Prepare the score container but keep it hidden
        document.getElementById('black-score').textContent = score.black.toFixed(1);
        document.getElementById('white-score').textContent = score.white.toFixed(1);

        // Show winner indicator
        const blackWins = score.black > score.white;
        document.getElementById('black-winner').style.display = blackWins ? 'inline' : 'none';
        document.getElementById('white-winner').style.display = blackWins ? 'none' : 'inline';

        // Calculate bar width based on black's portion (just like winrate)
        const totalScore = score.black + score.white;
        const blackPercent = (score.black / totalScore) * 100;

        // Animate transition
        // First fade out winrate
        document.getElementById('winrate-container').style.opacity = '0';

        // After the fade out completes, switch displays and fade in score
        setTimeout(() => {
            // Hide winrate, show score (but initially transparent)
            document.getElementById('winrate-container').style.display = 'none';
            document.getElementById('score-container').style.display = 'block';
            document.getElementById('score-container').style.opacity = '0';

            // Force a reflow to ensure the opacity transition works
            void document.getElementById('score-container').offsetWidth;

            // Initial bar width at 0 for animation
            document.getElementById('score-bar').style.width = '0';

            // Start fade in
            document.getElementById('score-container').style.opacity = '1';

            // After a slight delay, animate the bar width
            setTimeout(() => {
                document.getElementById('score-bar').style.width = blackPercent + '%';
            }, 200);
        }, 400);
    } else {
        alert("Game not over yet! Pass twice to end the game.");
    }
}

function clearGame() {
    console.log("[Board Update] Clearing board");
    fetch('/clear_board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("[Server Response] " + data.message);
            initializeGame();

            // Reset AI system
            if (typeof resetAISystem === 'function') {
                resetAISystem();
            }

            // Animate transition back to winrate view if score is showing
            if (document.getElementById('score-container').style.display !== 'none') {
                // Fade out score
                document.getElementById('score-container').style.opacity = '0';

                // After fade completes, switch to winrate
                setTimeout(() => {
                    document.getElementById('score-container').style.display = 'none';
                    document.getElementById('winrate-container').style.display = 'block';
                    document.getElementById('winrate-container').style.opacity = '0';

                    // Force a reflow
                    void document.getElementById('winrate-container').offsetWidth;

                    // Fade in winrate
                    document.getElementById('winrate-container').style.opacity = '1';
                }, 400);
            }
        });
}

function changeBoardSize(size) {
    console.log(`[Board Update] Changing board size to ${size}x${size}`);
    currentBoardSize = size;

    fetch('/board_size', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ size: size })
    })
        .then(response => response.json())
        .then(data => {
            console.log("[Server Response] " + data.message);
            initializeGame();

            // Reset AI system
            if (typeof resetAISystem === 'function') {
                resetAISystem();
            }

            // Animate transition back to winrate view if score is showing
            if (document.getElementById('score-container').style.display !== 'none') {
                // Fade out score
                document.getElementById('score-container').style.opacity = '0';

                // After fade completes, switch to winrate
                setTimeout(() => {
                    document.getElementById('score-container').style.display = 'none';
                    document.getElementById('winrate-container').style.display = 'block';
                    document.getElementById('winrate-container').style.opacity = '0';

                    // Force a reflow
                    void document.getElementById('winrate-container').offsetWidth;

                    // Fade in winrate
                    document.getElementById('winrate-container').style.opacity = '1';
                }, 400);
            }
        });
}

function undoMove() {
    console.log("[Action] Undo requested");

    // Set the flag to prevent the postRender callback from sending a move log
    isUndoOperation = true;

    // Store the current board state before undo
    const lastMove = game.currentState().playedPoint;
    const lastMoveColor = game.currentState().color;

    // Get the move coordinates in the format expected by the server
    let undoMessage;
    if (lastMove) {
        const boardSize = game.boardSize;
        const x = lastMove.x;
        const y = boardSize - 1 - lastMove.y;  // Flip Y-axis

        const letters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
        const rowNumber = y + 1;
        const columnLetter = letters[x];

        undoMessage = lastMoveColor.toUpperCase() + " undone " + columnLetter + rowNumber;
    } else {
        undoMessage = "UNDO requested";
    }

    // Update the UI
    game.undo();

    // Notify backend of the undo
    fetch('/undo', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: undoMessage
    })
        .then(response => {
            console.log("[Action] Move undone successfully");
            setTimeout(() => { isUndoOperation = false; }, 100);
        });
}

// Export functions and variables for AI system
function getCurrentTurn() {
    return currentTurn;
}

// Initialize the game on load
document.addEventListener('DOMContentLoaded', function() {
    console.log("[Initialization] Loading Go board");
    // Initialize the game after loading both JS files
    if (typeof initAISystem === 'function') {
        initAISystem();
    }
    initializeGame();
    console.log("[Initialization] Go board initialized");
});