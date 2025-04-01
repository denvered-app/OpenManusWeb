# OpenManus Web Application

This is the web interface for the OpenManus project, providing a friendly user interface that allows users to interact with the OpenManus AI assistant directly in their browser.

![OpenManus Web Interface](../assets/interface.png)

## Key Features

- 🌐 Modern web interface with real-time communication
- 💬 Intuitive chat interface for asking questions and getting AI responses
- 🧠 Visualization of thinking process, showing each step of AI reasoning
- 📁 Workspace file management to view and manage AI-generated files
- 📊 Detailed log tracking and monitoring
- 🚀 Support for interrupting and stopping ongoing requests

## Tech Stack

- **Backend**: FastAPI, Python, WebSocket
- **Frontend**: HTML, CSS, JavaScript
- **Communication**: WebSocket real-time communication
- **Storage**: File system for generated files and logs

## Quick Start

1. Make sure all dependencies are installed:

```bash
pip install -r requirements.txt
```

2. Start the web server:

```bash
python web_run.py
```

Or from the project root:

```bash
python main.py --web
```

3. Open your browser and visit: http://localhost:8000

## Project Structure

```
app/web/
├── app.py               # Web app main entry, FastAPI instance
├── log_handler.py       # Log handling module
├── log_parser.py        # Log parser
├── thinking_tracker.py  # Thinking process tracker
├── static/              # Static assets folder (JS, CSS)
│   ├── connected_interface.html # Main interface HTML
│   ├── connected_interface.js   # Main interface JavaScript
│   └── ...                      # Other static assets
└── templates/           # Jinja2 templates folder
```

## API Endpoints

### Chat Related

- `POST /api/chat` - Create new chat session
- `GET /api/chat/{session_id}` - Get results for specific session
- `POST /api/chat/{session_id}/stop` - Stop processing for specific session
- `WebSocket /ws/{session_id}` - Establish WebSocket connection for session

### File Related

- `GET /api/files` - Get all workspace directories and files
- `GET /api/files/{file_path}` - Get content of specific file

### Log Related

- `GET /api/logs` - Get system log list
- `GET /api/logs/{log_name}` - Get specific log file content
- `GET /api/logs_parsed` - Get list of parsed log info
- `GET /api/logs_parsed/{log_name}` - Get parsed info for specific log file
- `GET /api/latest_log` - Get parsed info for latest log file
- `GET /api/systemlogs/{session_id}` - Get system logs for specific session

### Thinking Process

- `GET /api/thinking/{session_id}` - Get thinking steps for specific session
- `GET /api/progress/{session_id}` - Get progress info for specific session

## Interface Overview

The OpenManus Web interface is divided into two main parts:

1. **Left Panel** - Shows AI thinking process and workspace files
   - AI timeline: Displays each step in AI processing
   - Workspace files: Shows AI-generated files, clickable for content

2. **Right Panel** - Chat interface
   - Chat history: Shows user and AI conversation
   - Input area: Users can type questions or commands

## Local Development

1. Clone the repository
2. Install dependencies
3. Start the app in development mode:

```bash
uvicorn app.web.app:app --reload
```
or
```bash
python web_run.py
```

## Contributing

Contributions are welcome! Feel free to contribute code, report issues, or suggest improvements. Please create an Issue or submit a Pull Request.

## License

This project is under an [open source license], see LICENSE file in project root for details.

## Support

For questions or help, please create a GitHub Issue.

