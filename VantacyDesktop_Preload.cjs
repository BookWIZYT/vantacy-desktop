const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("vantaDesktop", { openProject:()=>ipcRenderer.invoke("open-project"), saveFile:(p,c)=>ipcRenderer.invoke("save-file",p,c), runCommand:c=>ipcRenderer.invoke("run-command",c) });
