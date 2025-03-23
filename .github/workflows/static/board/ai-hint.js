document.addEventListener('DOMContentLoaded', () => {
    // Define the common HTML markup once
    const hintMarkup = `
        <button class="ai-hint-toggle">
            <span>AI Hint</span>
        </button>
        <div class="ai-hint-panel">
            <div class="ai-hint-content">
                <div class="ai-hint-header">
                    <div class="ai-hint-title">AI Analysis</div>
                    <button class="ai-hint-close">&times;</button>
                </div>
                <div class="ai-suggestion">
                    Suggested Move: <span id="ai-suggested-move">-</span>
                </div>
                <div class="ai-explanation" id="ai-move-explanation">
                    Waiting for analysis...
                </div>
            </div>
        </div>
    `;

    // Try to find the primary container
    const controlsContainer = document.querySelector('.action-controls');

    let parentContainer;
    if (controlsContainer) {
        parentContainer = controlsContainer.parentNode;
    } else {
        console.warn('[AI Hint] Could not find .action-controls element');
        parentContainer = document.querySelector('.game-controls') ||
                          document.querySelector('.board-controls') ||
                          document.querySelector('#board-container') ||
                          document.body;
        console.log('[AI Hint] Using alternative container:', parentContainer);
    }

    // Create the hint container
    const hintContainer = document.createElement('div');
    hintContainer.className = 'ai-hint-container';
    hintContainer.innerHTML = hintMarkup;

    // Insert the hint container appropriately
    if (controlsContainer) {
        parentContainer.insertBefore(hintContainer, controlsContainer.nextSibling);
    } else if (parentContainer === document.body) {
        // If using the document body, position the container fixed at the top-right
        hintContainer.style.position = 'fixed';
        hintContainer.style.top = '20px';
        hintContainer.style.right = '20px';
        hintContainer.style.zIndex = '9999';
        parentContainer.appendChild(hintContainer);
    } else {
        parentContainer.appendChild(hintContainer);
    }

    // Initialize the hint system UI and events
    initializeHintSystem(hintContainer);

    // Variables to track current move state
    let currentBestMove = null;
    let currentWinrate = null;
    let currentMoveColor = null;

    // Function to set up the hint system UI and events
    function initializeHintSystem(container) {
        const toggleButton = container.querySelector('.ai-hint-toggle');
        const closeButton = container.querySelector('.ai-hint-close');
        const hintPanel = container.querySelector('.ai-hint-panel');
        const suggestedMoveElement = container.querySelector('#ai-suggested-move');
        const explanationElement = container.querySelector('#ai-move-explanation');

        console.log('[AI Hint] UI Elements:', {
            toggleButton: !!toggleButton,
            closeButton: !!closeButton,
            hintPanel: !!hintPanel,
            suggestedMoveElement: !!suggestedMoveElement,
            explanationElement: !!explanationElement
        });

        // Toggle panel function
        const togglePanel = () => {
            const isActive = hintPanel.classList.contains('active');
            if (isActive) {
                hintPanel.classList.remove('active');
                toggleButton.classList.remove('active');
            } else {
                hintPanel.classList.add('active');
                toggleButton.classList.add('active');
                updateHintDisplay();
            }
        };

        // Add event listeners
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePanel();
            console.log('[AI Hint] Toggle button clicked');
        });

        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            hintPanel.classList.remove('active');
            toggleButton.classList.remove('active');
        });

        // Escape key support to close the panel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hintPanel.classList.contains('active')) {
                togglePanel();
            }
        });

        // Clicking outside the container closes the panel
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && hintPanel.classList.contains('active')) {
                togglePanel();
            }
        });

        // Subtle hover effects for the panel
        hintPanel.addEventListener('mouseenter', () => {
            hintPanel.style.transform = 'scale(1.01) translateY(-2px)';
            hintPanel.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.18)';
        });

        hintPanel.addEventListener('mouseleave', () => {
            hintPanel.style.transform = 'scale(1) translateY(0)';
            hintPanel.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.15)';
        });
    }

    // Function to update the hint display with current move data
    function updateHintDisplay() {
        const suggestedMoveElement = document.getElementById('ai-suggested-move');
        const explanationElement = document.getElementById('ai-move-explanation');

        if (!suggestedMoveElement || !explanationElement) {
            console.warn('[AI Hint] Move or explanation elements not found');
            return;
        }

        if (currentBestMove) {
            suggestedMoveElement.textContent = currentBestMove;
            suggestedMoveElement.setAttribute('data-color', currentMoveColor.toLowerCase());
            // Set a static explanation message since no LLM API is used
            explanationElement.textContent = "Local analysis: No LLM API in use.";
        } else {
            suggestedMoveElement.textContent = "...";
            explanationElement.textContent = "Waiting for AI analysis...";
        }
    }

    // Function to get current board context (if needed in the future)
    function getBoardContext() {
        try {
            if (typeof game !== 'undefined') {
                const state = game.currentState();
                const boardSize = game.boardSize;
                const moveCount = state.moveNumber || 0;
                let gamePhase = "opening";
                if (moveCount > boardSize * 2) {
                    gamePhase = "middle game";
                } else if (moveCount > boardSize * 3) {
                    gamePhase = "endgame";
                }
                return `${gamePhase} on a ${boardSize}x${boardSize} board`;
            }
        } catch (e) {
            console.error("[AI Hint] Error getting board context:", e);
        }
        return "";
    }

    // Initialize socket listeners to update AI move suggestions
    function initSocketListeners() {
        if (typeof socket === 'undefined') {
            console.warn('[AI Hint] Socket not available yet, waiting...');
            setTimeout(initSocketListeners, 100);
            return;
        }
        socket.on('ai_best_move', (data) => {
            // Expected data format: "AI (B) will play: D4 (60.5% Black win)"
            const moveMatch = data.match(/will play: ([A-Z0-9]+) \(([0-9.]+)% (Black|White) win\)/);
            const colorMatch = data.match(/AI \(([BW])\)/);
            if (moveMatch && moveMatch[1] && colorMatch && colorMatch[1]) {
                const move = moveMatch[1];
                const winrate = parseFloat(moveMatch[2]);
                const colorCode = colorMatch[1];
                const moveColor = colorCode === 'B' ? 'Black' : 'White';

                console.log(`[AI Hint] New best move received: ${moveColor} at ${move} (${winrate}%)`);

                // Update stored values
                currentBestMove = move;
                currentWinrate = winrate;
                currentMoveColor = moveColor;

                // Update UI if visible
                const hintPanel = document.querySelector('.ai-hint-panel');
                if (hintPanel && hintPanel.classList.contains('active')) {
                    updateHintDisplay();
                }
            }
        });

            // Add this listener for GPT analysis updates
        socket.on('gpt_move_analysis', (data) => {
            console.log('[AI Hint] Received GPT analysis:', data); // Debugging: log the analysis data
            const explanationElement = document.getElementById('ai-move-explanation');
            if (explanationElement) {
                explanationElement.textContent = data;
            }
        });


        console.log('[AI Hint] Socket listeners initialized');
    }

    // Start socket listeners
    initSocketListeners();
    console.log('[AI Hint] System initialized');

    // ======== PUBLIC API ========
    // Example function to set a new move explainer function (if needed)
    window.setMoveExplainer = function(explainerFunction) {
        console.log('[AI Hint] Setting new explainer function');
        window.customExplainerFunction = explainerFunction;
    };
});
