# Vanta Code Desktop

Cross-platform Electron prototype for the Vanta Code local companion.

## Run

```bash
npm install
npm start
```

## Agent Worker

Deploy `../vanta-code-worker.js` as a separate Cloudflare Worker with an `AI` binding. Set `CODE_MODEL` to override the default and set `DESKTOP_AGENT_TOKEN` to require a bearer token. Paste the deployed `/agent` URL into the app when prompted.

The companion can open a project, show text files, send approved project context to the agent, save an explicitly approved file, and run an explicitly approved command.
