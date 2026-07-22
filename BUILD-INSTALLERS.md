# Vantacy Desktop installers

The end user does not need Node.js. Node.js is only needed by the developer or build server that creates the installer.

## Build locally

```bash
npm install
npm run dist
```

Platform-specific commands:

```bash
npm run dist:win
npm run dist:mac
npm run dist:linux
```

Installers are written to `release/`.

## GitHub Actions build

The repository can build Windows, macOS, and Linux installers with the workflow in `.github/workflows/build-installers.yml`.
