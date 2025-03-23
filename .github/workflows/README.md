# LinGo: Interactive Go Board & Learning Platform

![LinGo Logo](https://via.placeholder.com/800x200/f0f0e8/333?text=LinGo)

## Overview

LinGo is a comprehensive Go learning platform that combines an interactive Go board with KataGo AI analysis and educational resources. Perfect for beginners learning the game or experienced players looking to improve their skills through AI-assisted analysis.

## Development

This project is under collaborative development with the following structure:

### Github Desktop App Tutorial
https://www.youtube.com/watch?v=8Dd7KRpKeaE


### Collaboration Guidelines
- Only modify on your own folders and scripts
- Shared files and `server.py` modification should be discussed first to prevent merge conflicts
  

### Add Routes in server.py
For example, If your learning section need include quizzes or other features, you might want to add routes for them at `server.py`:
```
@app.route('/learn/quiz')
def quiz_page():
    """Render the quiz page."""
    return render_template('quiz.html')

@app.route('/learn/quiz/submit', methods=['POST'])
def submit_quiz():
    """Handle quiz submissions."""
    # Get quiz data from request
    quiz_data = request.get_json()
    # Process quiz data (store in database, calculate score, etc.)
    # Return result
    return jsonify({"score": score, "feedback": feedback})
```

## Features

### Interactive Go Board
- Play on 9×9, 13×13, or 19×19 boards
- Real-time KataGo AI analysis with move suggestions
- Dynamic win rate visualization
- AI opponent mode (play against KataGo as either Black or White)
- Game controls: pass, undo, score calculation

### Learning Platform
- Structured Go tutorials for players of all levels
- Interactive quizzes to test your knowledge
- Problem-solving exercises with AI feedback
- Progress tracking system
- Visualization of game concepts and tactics

### Rules & Resources
- Comprehensive explanation of Go rules
- Strategy guides for opening, middle, and endgame
- Common patterns and techniques explained
- Terminology dictionary
- Historical context and game significance

## Project Structure

```
lingo/
├── server.py                          # Main Flask application
├── templates/
│   ├── board/
│   │   └── board.html                 # Go board interface
│   ├── learn/
│   │   └── learn.html                 # Learning modules page
│   └── rules/
│       └── rules.html                 # Rules documentation page
├── static/
│   ├── tenuki.min.css                 # Go board library CSS
│   ├── tenuki.min.js                  # Go board library JS
│   ├── app-styles.css                 # App layout styles
│   ├── sidebar-collapse.css           # Sidebar styles
│   ├── sidebar-nav.js                 # Navigation script
│   ├── board/
│   │   ├── board-styles.css           # Board-specific styles
│   │   ├── go-board-core.js           # Core gameplay logic
│   │   └── go-board-ai.js             # AI integration logic
│   ├── learn/
│   │   └── learn.css                  # Learn page styles
│   │   └── learn.js                   # Learn page scripts
│   └── rules/
│       └── rules.css                  # Rules page styles
│       └── rules.js                   # Rules page scripts
└── Katago/                            # KataGo engine folder (git ignored)

```

## Setup and Installation

### Prerequisites
- Python 3.8+
- KataGo (download separately)

### Steps
1. Download KataGo:
   - Download from [KataGo's GitHub](https://github.com/lightvector/KataGo/releases)
   - Place the executable and model files in the `Katago` directory
   - Update the paths in `server.py` to match your KataGo installation

2. Run the application (import necessary libraries):
   ```
   python server.py
   ```

3. Access the application at `http://localhost:5000`


## License

[Specify your license here]

## Acknowledgments

- KataGo for the AI engine
- Tenuki.js for the Go board implementation
- All contributors to this educational platform

---

*LinGo: Master the ancient game of Go through modern learning techniques*
