import json
import subprocess
import time
import threading
from threading import Thread, Timer
import sgfmill.boards
import sgfmill.ascii_boards
from typing import Tuple, List, Union, Literal, Any, Dict, Optional
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import os
from pathlib import Path
from chatgpt_analyzer import analyze_move

# ------------------ Initialize App ------------------
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# ------------------ Global Variables ------------------
# Game state
board_size = 9  # Default board size
board = sgfmill.boards.Board(board_size)
komi = 6.5
all_moves = []
stored_board = None

# Winrate display
current_query_id = None
displayed_winrate = 50.0
is_dynamic_winrate = True

# Analysis timer
analysis_timer: Optional[Timer] = None
DEBOUNCE_DELAY = 1  # seconds

# AI moves
ai_move_suggestions = []
ai_player_color = None
ai_best_move = None  # Will store the best move for AI to play


# ------------------ Helper Functions ------------------
def parse_move_text(move_text: str):
    parts = move_text.strip().split()
    if len(parts) < 3:
        # Check if this is a pass
        if "passed" in move_text.lower():
            color_str = parts[0]
            color_bw = "b" if color_str.upper() == "BLACK" else "w"
            return [(color_bw, "pass")]
        return []

    color_str = parts[0]
    move_str = parts[2]
    color_bw = "b" if color_str.upper() == "BLACK" else "w"
    letters = "ABCDEFGHJKLMNOPQRSTUVWXYZ"
    letter = move_str[0].upper()
    col = letters.index(letter)
    row = int(move_str[1:]) - 1
    return [(color_bw, (row, col))]


def sgfmill_to_str(move: Union[None, Literal["pass"], Tuple[int, int]]) -> str:
    if move is None or move == "pass":
        return "pass"
    (y, x) = move
    return "ABCDEFGHJKLMNOPQRSTUVWXYZ"[x] + str(y + 1)


def initialize_board(size: int):
    global board, board_size, stored_board, all_moves, displayed_winrate
    board_size = size
    board = sgfmill.boards.Board(size)
    stored_board = board.copy()
    all_moves = []
    print(f"[Board] Initialized to {size}x{size}")

    # Reset winrate display to default
    displayed_winrate = 50.0
    socketio.emit('winrate_update', {'winrate': displayed_winrate})


# ------------------ KataGo Engine Wrapper ------------------
class KataGo:
    def __init__(self, katago_path: str, config_path: str, model_path: str, additional_args: List[str] = None):
        if additional_args is None:
            additional_args = []
        self.query_counter = 0
        self.terminate_query_counter = 0
        self.katago = subprocess.Popen(
            [katago_path, "analysis", "-config", config_path, "-model", model_path, *additional_args],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        def print_forever():
            while self.katago.poll() is None:
                data = self.katago.stderr.readline()
                time.sleep(0)
                if data:
                    print("[KataGo]", data.decode(), end="")
            remaining = self.katago.stderr.read()
            if remaining:
                print("[KataGo]", remaining.decode(), end="")

        self.stderrthread = Thread(target=print_forever)
        self.stderrthread.start()

    def close(self):
        self.katago.stdin.close()

    def query(self, initial_board: sgfmill.boards.Board, moves: List[Tuple[str, Tuple[int, int]]],
              komi: float, max_visits=None, callback=None) -> Dict[str, Any]:
        global current_query_id
        query = {}
        query["id"] = str(self.query_counter)
        current_query_id = query["id"]
        self.query_counter += 1
        query["moves"] = [[color.upper(), sgfmill_to_str(move)] for color, move in moves]
        query["initialStones"] = []
        for y in range(initial_board.side):
            for x in range(initial_board.side):
                color = initial_board.get(y, x)
                if color:
                    query['initialStones'].append([color.upper(), sgfmill_to_str((y, x))])
        query["rules"] = "Chinese"
        query["komi"] = komi
        query["boardXSize"] = initial_board.side
        query["boardYSize"] = initial_board.side
        query["includePolicy"] = True
        query["analyzeTurns"] = [len(moves)]
        query["reportDuringSearchEvery"] = 1
        if max_visits is not None:
            query["maxVisits"] = max_visits
        return self.query_raw(query, callback)

    def query_raw(self, query: Dict[str, Any], callback=None) -> Dict[str, Any]:
        self.katago.stdin.write((json.dumps(query) + "\n").encode())
        self.katago.stdin.flush()
        final_response = None
        while True:
            line = ""
            while line == "":
                if self.katago.poll():
                    break
                line = self.katago.stdout.readline().decode().strip()
            try:
                response = json.loads(line)
            except json.decoder.JSONDecodeError:
                print("[Error] Invalid JSON received; skipping:", line)
                continue
            if callback is not None:
                callback(response)
            if not response.get("isDuringSearch", False):
                final_response = response
                break
        return final_response

    def terminate(self, terminate_id: str):
        termination_query = {
            "id": "TERM " + str(self.terminate_query_counter),
            "action": "terminate",
            "terminateId": terminate_id
        }
        self.terminate_query_counter += 1
        self.katago.stdin.write((json.dumps(termination_query) + "\n").encode())
        self.katago.stdin.flush()
        print(f"[KataGo] Sent terminate command for query {terminate_id}.")


# ------------------ Analysis Functions ------------------
def get_winrate(response: Dict[str, Any]):
    global displayed_winrate, current_query_id, is_dynamic_winrate
    global ai_player_color, ai_move_suggestions

    # Check if this response is for the current query
    response_id = response.get("id", "")
    if response_id != current_query_id:
        print(f"[Winrate] Ignoring outdated response for query {response_id}")
        return

    previous_winrate = displayed_winrate

    # If KataGo is still searching (dynamic updates)
    if response.get("isDuringSearch", False):
        if is_dynamic_winrate:
            root_info = response.get("rootInfo", {})
            raw_winrate = root_info.get("winrate", 0.5) * 100
            displayed_winrate = raw_winrate
            print(f"[Winrate] Dynamic: {displayed_winrate:.1f}% (query {response_id})", flush=True)
    else:
        # Search is complete - always show the final winrate
        root_info = response.get("rootInfo", {})
        raw_winrate = root_info.get("winrate", 0.5) * 100
        displayed_winrate = raw_winrate
        print(f"[Winrate] Final: {displayed_winrate:.1f}% (query {response_id})", flush=True)

        # Analysis is complete, extract the top moves
        extract_top_moves(response)

    # Only emit if the winrate has changed
    if abs(displayed_winrate - previous_winrate) > 0.1:
        socketio.emit('winrate_update', {'winrate': displayed_winrate})


def extract_top_moves(response):
    """
    Extract the top move suggestions from KataGo's response when search is complete.
    Always uses Black's perspective for win rates, with:
    - For Black: highest win rate is best
    - For White: lowest win rate is best
    Returns a tuple containing all the move information
    """
    global ai_player_color, ai_move_suggestions, ai_best_move, current_query_id

    # Skip if we don't have a valid response
    if not isinstance(response, dict) or 'rootInfo' not in response or 'moveInfos' not in response:
        return False

    # Check if this response is for the current query
    response_id = response.get("id", "")
    if response_id != current_query_id:
        print(f"[AI Moves] Ignoring outdated response for query {response_id}")
        return False

    # Get current player
    ai_player_color = response['rootInfo'].get('currentPlayer', 'unknown')

    # Extract move suggestions
    ai_move_suggestions = []
    ai_best_move = None

    # Initialize best score for comparing moves
    best_score = -1.0 if ai_player_color == "B" else 2.0  # Black wants high, White wants low

    for move_info in response['moveInfos']:
        suggestion = {
            'move': move_info.get('move', 'unknown'),
            'winrate': move_info.get('winrate', 0.0),
            'visits': move_info.get('visits', 0),
            'scoreLead': move_info.get('scoreLead', 0.0),
            'order': move_info.get('order', 999)
        }
        ai_move_suggestions.append(suggestion)

        # Check if this move is better for the current player
        if ai_player_color == "B":
            # Black wants highest win rate
            if suggestion['winrate'] > best_score:
                best_score = suggestion['winrate']
                ai_best_move = suggestion['move']
        else:
            # White wants lowest win rate (from Black's perspective)
            if suggestion['winrate'] < best_score:
                best_score = suggestion['winrate']
                ai_best_move = suggestion['move']

    # Process the top three suggested moves and highlight the best move
    if ai_move_suggestions:
        # Sort differently based on color
        if ai_player_color == "B":
            # Black wants highest winrate first
            sorted_moves = sorted(ai_move_suggestions, key=lambda x: x['winrate'], reverse=True)
        else:
            # White wants lowest winrate first
            sorted_moves = sorted(ai_move_suggestions, key=lambda x: x['winrate'])

        top_moves = sorted_moves[:3]
        move_strings = []

        for m in top_moves:
            # Always display win rate from Black's perspective (no flipping)
            black_win_pct = m['winrate'] * 100
            move_str = f"{m['move']} ({black_win_pct:.1f}%)"
            if m['move'] == ai_best_move:
                move_str += " ★"  # Mark the best move with a star
            move_strings.append(move_str)

        # Return all the processed information
        return {
            'has_moves': True,
            'player_color': ai_player_color,
            'move_strings': move_strings,
            'best_move': ai_best_move,
            'best_win_pct': best_score * 100  # Always from Black's perspective
        }
    else:
        return {
            'has_moves': False,
            'player_color': ai_player_color
        }


def send_ai_moves(move_info):
    """
    Takes processed move information and sends it to the frontend.
    All win rates are from Black's perspective.
    """
    if not move_info:
        return

    if move_info['has_moves']:
        # Create the text messages
        top_moves_text = f"AI ({move_info['player_color']}) top moves: {move_info['move_strings']}"

        win_pct = move_info['best_win_pct']
        best_move_text = f"AI ({move_info['player_color']}) will play: {move_info['best_move']} ({win_pct:.1f}% Black win)"

        # Start a separate thread for ChatGPT analysis
        def process_gpt_analysis():
            # board_size and all_moves should be defined in your scope.
            board_context = f"board size = {board_size}, all moves: {all_moves}"
            gpt_analysis = analyze_move(move_info['best_move'], board_context)
            socketio.emit('gpt_move_analysis', gpt_analysis)

        threading.Thread(target=process_gpt_analysis).start()

        # Print to server console
        print(f"[AI] {top_moves_text}")
        print(f"[AI] {best_move_text}")

        # Send the text messages to the frontend
        socketio.emit('ai_top_moves', top_moves_text)
        socketio.emit('ai_best_move', best_move_text)
    else:
        no_suggestions_text = f"AI ({move_info['player_color']}) has no suggestions"
        print(f"[AI] {no_suggestions_text}")
        socketio.emit('ai_top_moves', no_suggestions_text)
        socketio.emit('ai_best_move', f"AI ({move_info['player_color']}) will not play")


def perform_analysis():
    global board, all_moves, stored_board, katago, komi, displayed_winrate
    global ai_move_suggestions, ai_player_color

    # Even if there are no moves, we should still analyze the initial board position
    # We only reset the winrate but still continue with analysis
    if not all_moves:
        displayed_winrate = 50.0
        socketio.emit('winrate_update', {'winrate': displayed_winrate})
        # Don't return - continue to analyze the empty board

        # Specify the current player for an empty board (always Black)
        ai_player_color = "B"

    print(f"[Analysis] Starting for position with {len(all_moves)} moves")

    # Use get_winrate as callback for dynamic updates
    response = katago.query(board, all_moves, komi, callback=get_winrate)

    # Once analysis is complete, extract and send the moves
    move_info = extract_top_moves(response)
    if move_info:
        send_ai_moves(move_info)

def reset_game_state():
    global board, all_moves, stored_board, displayed_winrate, current_query_id
    global ai_move_suggestions, ai_best_move, ai_player_color, analysis_timer, komi

    # Reinitialize the board (using current board_size)
    board = sgfmill.boards.Board(board_size)
    all_moves = []
    stored_board = board.copy()

    # Reset winrate and AI state
    displayed_winrate = 50.0
    current_query_id = None
    ai_move_suggestions = []
    ai_best_move = None
    ai_player_color = None

    # Cancel any pending analysis timer
    if analysis_timer is not None:
        analysis_timer.cancel()
        analysis_timer = None

    # Optionally reset komi if needed
    komi = 6.5

    # Emit the reset winrate to the frontend
    socketio.emit('winrate_update', {'winrate': displayed_winrate})
    print("[Reset] Game state has been reset.")


# ------------------ Socket.IO Event Handlers ------------------
@socketio.on('connect')
def handle_connect():
    print('[Socket] Client connected')
    reset_game_state()  # Reset the game state on new connection
    emit('winrate_update', {'winrate': displayed_winrate})


@socketio.on('disconnect')
def handle_disconnect():
    print('[Socket] Client disconnected')


# ------------------ Flask Endpoints ------------------
@app.route('/')
def home():
    return render_template('board/board.html')

@app.route('/learn')
def learn_page():
    """Render the learn page."""
    return render_template('learn/learn.html')  # Note the subdirectory path

@app.route('/rules')
def rules_page():
    """Render the rules page."""
    return render_template('rules/rules.html')  # Note the subdirectory path

@app.route('/rules/<filename>')
def serve_video(filename):
    return send_from_directory('videos', filename)

@app.route('/winrate')
def winrate():
    return jsonify({"winrate": displayed_winrate})


@app.route('/log', methods=['POST'])
def receive_move():
    global board, stored_board, all_moves, analysis_timer

    raw_data = request.get_data(as_text=True)

    # Special handling for analysis requests
    if raw_data.strip() == "ANALYSIS_REQUEST":
        print("[Server] Received analysis request")

        # Cancel any pending analysis timer
        if analysis_timer is not None:
            analysis_timer.cancel()

        # Start analysis after brief delay
        analysis_timer = Timer(DEBOUNCE_DELAY, perform_analysis)
        analysis_timer.start()

        return "Analysis requested", 200

    # Process actual moves
    new_moves = parse_move_text(raw_data)

    # Skip empty moves completely
    if not new_moves:
        return "No valid moves", 200

    print(f"[Move] Received: {new_moves}")
    all_moves.extend(new_moves)

    if stored_board is None:
        stored_board = board.copy()
    display_board = stored_board.copy()

    for color, move in new_moves:
        if move != "pass":
            row, col = move
            display_board.play(row, col, color)

    print(sgfmill.ascii_boards.render_board(display_board))
    stored_board = display_board.copy()

    # Cancel any pending analysis timer
    if analysis_timer is not None:
        analysis_timer.cancel()
    # Start a timer that waits DEBOUNCE_DELAY seconds
    analysis_timer = Timer(DEBOUNCE_DELAY, perform_analysis)
    analysis_timer.start()

    return "Received", 200


@app.route('/player_status', methods=['POST'])
def receive_player_status():
    """Handle player status updates from the frontend."""
    raw_data = request.get_data(as_text=True)
    print("[Player] Status update:", raw_data)

    # Parse the status message to update global variables if needed later
    # For now, we'll just print it out as requested

    return "Received player status", 200


@app.route('/clear_board', methods=['POST'])
def clear_board():
    global all_moves, stored_board, board, analysis_timer, displayed_winrate

    # Cancel any pending analysis
    if analysis_timer is not None:
        analysis_timer.cancel()
        analysis_timer = None

    # Reset game state
    all_moves = []
    stored_board = board.copy()

    # Reset winrate to 50%
    displayed_winrate = 50.0
    socketio.emit('winrate_update', {'winrate': displayed_winrate})

    print("[Board] Cleared")
    return jsonify({"message": "Board cleared successfully"}), 200


@app.route('/board_size', methods=['POST'])
def change_board_size():
    global analysis_timer

    # Get new board size from request
    data = request.get_json()
    new_size = int(data['size'])

    # Cancel any pending analysis
    if analysis_timer is not None:
        analysis_timer.cancel()
        analysis_timer = None

    # Initialize new board with the specified size
    initialize_board(new_size)

    print(f"[Board] Size changed to {new_size}x{new_size}")
    return jsonify({"message": f"Board size changed to {new_size}x{new_size}"}), 200


@app.route('/undo', methods=['POST'])
def undo_move():
    global all_moves, stored_board, board, analysis_timer

    if not all_moves:
        print("[Action] Undo requested, but no moves to undo")
        return jsonify({"message": "No moves to undo"}), 200

    # Cancel any pending analysis
    if analysis_timer is not None:
        analysis_timer.cancel()

    # Remove the last move
    last_move = all_moves.pop()
    print(f"[Action] Undoing move: {last_move}")

    # Rebuild the board from scratch with the remaining moves
    stored_board = board.copy()
    display_board = stored_board.copy()

    for color, move in all_moves:
        if move != "pass":
            row, col = move
            display_board.play(row, col, color)

    stored_board = display_board.copy()
    print(sgfmill.ascii_boards.render_board(stored_board))

    # Schedule a new analysis
    analysis_timer = Timer(DEBOUNCE_DELAY, perform_analysis)
    analysis_timer.start()

    return jsonify({"message": "Move undone successfully"}), 200


# ------------------ Main Setup ------------------
if __name__ == "__main__":
    print("[Server] Starting Go application server")

    # Get the base directory of your application
    base_dir = Path(__file__).parent

    # Build paths relative to your application
    katago_dir = base_dir / "Katago"
    katago_path = katago_dir / "katago.exe"
    config_path = katago_dir / "analysis_example.cfg"
    model_path = katago_dir / "g170-b6c96-s175395328-d26788732.bin.gz"

    # Check if files exist
    if not katago_path.exists():
        print(f"[Error] KataGo executable not found at: {katago_path}")
        # You could add fallback paths or error handling here

    # Convert Path objects to strings for subprocess
    katago = KataGo(
        str(katago_path),
        str(config_path),
        str(model_path)

        
    )
    print("[Server] KataGo engine initialized")

    # Run with Socket.IO instead of regular Flask
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
    katago.close()