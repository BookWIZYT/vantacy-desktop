const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("vantaDesktop", {
  openProject: () => ipcRenderer.invoke("open-project"),

  saveFile: (filePath, content) =>
    ipcRenderer.invoke("save-file", filePath, content),

  runCommand: (command) =>
    ipcRenderer.invoke("run-command", command)
});
