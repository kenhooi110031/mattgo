// AI integration functionality for Go Board

// Socket.IO connection
const socket = io();

// AI state variables
let aiBestMove = null;
let pendingAiMoveForColor = null;
let blackPlayer = "human";
let whitePlayer = "human";

// Socket event handlers
socket.on('connect', () => {
    console.log('[Socket] Connected to server');
});

socket.on('disconnect', () => {
    console.log('[Socket] Disconnected from server');
});

socket.on('winrate_update', (data) => {
    const blackWinrate = data.winrate;
    const whiteWinrate = 100 - blackWinrate;

    // Update percentages
    document.getElementById('black-percentage').textContent = blackWinrate.toFixed(1);
    document.getElementById('white-percentage').textContent = whiteWinrate.toFixed(1);

    // Update bar width
    document.getElementById('black-winrate-bar').style.width = blackWinrate + '%';
});

socket.on('ai_top_moves', (data) => {
    console.log('[AI Analysis] Suggestions:', data);
});

socket.on('ai_best_move', (data) => {
    console.log('[AI Analysis] Best Move:', data);

    // Extract the actual move coordinates from the message
    //  format: "AI (B) will play: D4 (60.5% Black win)"
    const moveMatch = data.match(/will play: ([A-Z0-9]+)/);

    if (moveMatch && moveMatch[1]) {
        aiBestMove = moveMatch[1];
        console.log('[AI Status] Received best move: ' + aiBestMove);
        // Try to play the move immediately if it's AI's turn
        playAiMoveIfNeeded();
    }
});

// Player selection button handlers
function initAISystem() {
    console.log('[Initialization] Setting up AI system');
    document.getElementById('black-human').addEventListener('click', () => {
        setBlackPlayer('human');
    });

    document.getElementById('black-ai').addEventListener('click', () => {
        setBlackPlayer('ai');
    });

    document.getElementById('white-human').addEventListener('click', () => {
        setWhitePlayer('human');
    });

    document.getElementById('white-ai').addEventListener('click', () => {
        setWhitePlayer('ai');
    });

    console.log('[Initialization] AI system ready');
}

// Reset AI system state
function resetAISystem() {
    console.log('[AI Status] Resetting AI system state');
    aiBestMove = null;
    pendingAiMoveForColor = null;
}

// Check if it's AI's turn and trigger analysis if needed
function checkAITurn() {
    const currentTurn = getCurrentTurn();
    const isAisTurn = (currentTurn === "black" && blackPlayer === "ai") ||
        (currentTurn === "white" && whitePlayer === "ai");

    if (isAisTurn) {
        // If it's AI's turn, the backend will analyze and send a recommendation
        console.log(`[AI Status] It's ${currentTurn}'s turn (AI). Waiting for move suggestion...`);
        requestAnalysis();
    }

    // Try to play if we already have a move recommendation
    playAiMoveIfNeeded();
}

// Update player selection functions
function setBlackPlayer(type) {
    const previousType = blackPlayer;
    blackPlayer = type;
    document.getElementById('black-human').classList.toggle('active', type === 'human');
    document.getElementById('black-ai').classList.toggle('active', type === 'ai');
    console.log(`[Player] Black player set to: ${type}`);

    // If switching from AI to human and it's currently black's turn, mark as pending
    if (previousType === 'ai' && type === 'human' && getCurrentTurn() === 'black') {
        console.log("[AI Status] Marking pending AI move for black");
        pendingAiMoveForColor = 'black';
    }

    // If switching from human to AI and it's currently black's turn, trigger AI move
    if (previousType === 'human' && type === 'ai' && getCurrentTurn() === 'black') {
        console.log("[AI Status] Requesting analysis for black AI...");
        requestAnalysis();
    }

    // Send the player status update to the backend
    sendPlayerStatusUpdate();
}

function setWhitePlayer(type) {
    const previousType = whitePlayer;
    whitePlayer = type;
    document.getElementById('white-human').classList.toggle('active', type === 'human');
    document.getElementById('white-ai').classList.toggle('active', type === 'ai');
    console.log(`[Player] White player set to: ${type}`);

    // If switching from AI to human and it's currently white's turn, mark as pending
    if (previousType === 'ai' && type === 'human' && getCurrentTurn() === 'white') {
        console.log("[AI Status] Marking pending AI move for white");
        pendingAiMoveForColor = 'white';
    }

    // If switching from human to AI and it's currently white's turn, trigger AI move
    if (previousType === 'human' && type === 'ai' && getCurrentTurn() === 'white') {
        console.log("[AI Status] Requesting analysis for white AI...");
        requestAnalysis();
    }

    // Send the player status update to the backend
    sendPlayerStatusUpdate();
}

// Function to handle AI moves
function playAiMoveIfNeeded() {
    const currentTurn = getCurrentTurn();
    // Check if it's AI's turn or if there's a pending AI move
    const isAisTurn = (currentTurn === "black" && blackPlayer === "ai") ||
        (currentTurn === "white" && whitePlayer === "ai");
    const isPendingMove = (pendingAiMoveForColor === currentTurn);

    if ((isAisTurn || isPendingMove) && aiBestMove) {
        console.log(`[AI Move] ${isPendingMove ? "Pending" : "Current"} AI (${currentTurn}) is playing move: ${aiBestMove}`);

        const coords = parseKataGoMove(aiBestMove);

        // Handle pass
        if (coords && coords.pass) {
            console.log('[AI Move] AI is passing');
            game.pass();

            // If this was a pending move, reset pending status
            if (isPendingMove) {
                pendingAiMoveForColor = null;
            }
            return;
        }

        // Play the move if valid coordinates were parsed
        if (coords && coords.x !== undefined && coords.y !== undefined) {
            console.log(`[AI Move] Playing at coordinates: (${coords.x}, ${coords.y})`);
            game.playAt(coords.y, coords.x); // Note: Tenuki takes (y, x) order

            // If this was a pending move, reset pending status
            if (isPendingMove) {
                pendingAiMoveForColor = null;
            }

        } else {
            console.error("[Error] Failed to parse AI move coordinates");
        }

        // Clear the best move after playing
        aiBestMove = null;
    }
}

// Function to send player status to the backend
function sendPlayerStatusUpdate() {
    const statusMessage = `players B=${blackPlayer} W=${whitePlayer}`;
    console.log("[Server Request] Sending to server: " + statusMessage);

    fetch('/player_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: statusMessage
    })
        .then(response => {
            if (response.ok) {
                console.log("[Server Response] Player status update sent successfully");
            } else {
                console.error("[Error] Failed to send player status update");
            }
        })
        .catch(error => {
            console.error("[Error] Error sending player status update:", error);
        });
}

// Function to explicitly request an analysis from KataGo
function requestAnalysis() {
    // Send a message to trigger KataGo to analyze the current board state
    console.log("[Server Request] Requesting KataGo analysis");
    fetch('/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: "ANALYSIS_REQUEST"
    })
        .then(response => {
            if (response.ok) {
                console.log("[Server Response] Analysis request sent successfully");
            } else {
                console.error("[Error] Failed to send analysis request");
            }
        })
        .catch(error => {
            console.error("[Error] Error sending analysis request:", error);
        });
}

// Utility function to parse KataGo move format to Tenuki coordinates
function parseKataGoMove(moveString) {
    // Skip if it's "pass" or invalid format
    if (!moveString || moveString === "pass") {
        return { pass: true };
    }

    // Extract letter and number
    const letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ";
    const letter = moveString.charAt(0).toUpperCase();
    const number = parseInt(moveString.substring(1));

    if (!letter || !number || letters.indexOf(letter) === -1) {
        console.error("[Error] Invalid move format:", moveString);
        return null;
    }

    // Convert to Tenuki coordinates (x, y)
    const x = letters.indexOf(letter);
    const y = game.boardSize - number; // Tenuki's y is inverted from traditional notation

    return { x: x, y: y };
}