# AI Agentic Lab — Simple Blogger Agent

**Website (local):** http://127.0.0.1:8000/dev-ui/?app=simple_blogger_agent

## Overview
This lab uses Python, Google Agent Development Kit (ADK), and the Gemini API to run a multi-agent blogging assistant. The **Blogger** coordinates the task, **BlogPlanner** prepares an outline, and **BlogWriter** develops the blog post. The project also includes outline and post validation agents.

## Setup and Run
1. Open the project in VS Code and navigate to the folder containing the `simple_blogger_agent` package.
2. Install dependencies: `python -m pip install -r simple_blogger_agent/requirements.txt`
3. Set `GOOGLE_API_KEY` in `simple_blogger_agent/.env` and choose an accessible `MODEL` (tested with `gemini-3.5-flash-lite`). Never publish your API key.
4. Run `adk web` from the parent folder and open the website link above.
5. Select `simple_blogger_agent` and enter a blog topic.

## Test Result
The agent was tested with a blog about the benefits of AI in education. The Planner generated an outline and the Writer produced a full article. The validation agents are included in the architecture, but their execution was not confirmed in this test.

**Note:** This website is local to the computer running ADK; it is not a public deployment.
