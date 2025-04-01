import argparse
import asyncio
import os
import sys

from app.agent.manus import Manus
from app.logger import logger


async def run_cli():
    """Run command line interaction mode"""
    agent = Manus()
    while True:
        try:
            prompt = input("Enter your prompt (or 'exit'/'quit' to quit): ")
            prompt_lower = prompt.lower()
            if prompt_lower in ["exit", "quit"]:
                logger.info("Goodbye!")
                break
            if not prompt.strip():
                logger.warning("Skipping empty prompt.")
                continue
            logger.warning("Processing your request...")
            await agent.run(prompt)
        except KeyboardInterrupt:
            logger.warning("Goodbye!")
            break


async def run_web():
    """Start Web application"""
    # Use subprocess to execute web_run.py
    import uvicorn

    # Ensure directory structure exists
    from web_run import check_websocket_dependencies, ensure_directories

    ensure_directories()

    if not check_websocket_dependencies():
        logger.error("Application exit. Please install required dependencies and try again.")
        return

    logger.info("🚀 OpenManus Web application is starting...")
    logger.info("Visit http://localhost:8000 to begin")

    # Set environment variable to enable auto-open browser
    os.environ["AUTO_OPEN_BROWSER"] = "1"

    # Start Uvicorn server in current process
    uvicorn.run("app.web.app:app", host="0.0.0.0", port=8000)


def main():
    """Main program entry, parse command line arguments to decide running mode"""
    parser = argparse.ArgumentParser(description="OpenManus - AI Assistant")
    parser.add_argument("--web", action="store_true", help="Run in Web application mode (default is CLI mode)")

    args = parser.parse_args()

    try:
        if args.web:
            # Start Web mode
            logger.info("Starting Web application mode...")
            asyncio.run(run_web())
        else:
            # Start CLI mode
            logger.info("Starting command line interaction mode...")
            asyncio.run(run_cli())
    except KeyboardInterrupt:
        logger.warning("Program exited")
    except Exception as e:
        logger.error(f"Program exited with error: {str(e)}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
