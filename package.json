const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");
const { autoUpdater } = require("electron-updater");
let win, rootDir = null;
function createWindow() { win = new BrowserWindow({ width: 1440, height: 920, minWidth: 980, minHeight: 650, webPreferences: { preload: path.join(__dirname, "VantacyDesktop_Preload.cjs"), contextIsolation: true, nodeIntegration: false } }); win.loadFile("VantacyDesktop_UI.html"); }
async function walk(dir, base = dir, out = []) { for (const name of await fs.readdir(dir)) { if ([".git","node_modules","dist","build"].includes(name)) continue; const full=path.join(dir,name), rel=path.relative(base,full); const st=await fs.stat(full); if(st.isDirectory()) await walk(full,base,out); else if(st.size<200000) out.push({path:rel,content:await fs.readFile(full,"utf8")}); } return out; }
ipcMain.handle("open-project", async () => { const r=await dialog.showOpenDialog({properties:["openDirectory"]}); if(r.canceled)return null; rootDir=r.filePaths[0]; return {rootDir,files:await walk(rootDir)}; });
ipcMain.handle("save-file", async (_, rel, content) => { if(!rootDir) throw new Error("No project open"); const target=path.resolve(rootDir,rel); if(!target.startsWith(path.resolve(rootDir)+path.sep)) throw new Error("Invalid path"); await fs.mkdir(path.dirname(target),{recursive:true}); await fs.writeFile(target,content,"utf8"); return true; });
ipcMain.handle("run-command", async (_, command) => { if(!rootDir) throw new Error("No project open"); return new Promise(resolve=>{ const child=spawn(command,{cwd:rootDir,shell:true,windowsHide:true}); let out="";child.stdout.on("data",d=>out+=d);child.stderr.on("data",d=>out+=d);child.on("close",code=>resolve({code,output:out.slice(-30000)})); }); });
app.whenReady().then(() => {
  createWindow();
  if (app.isPackaged) {
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.checkForUpdatesAndNotify().catch(() => {});
    autoUpdater.on("update-available", () => { if (win) win.webContents.send("update-status", "Downloading a Vantacy update…"); });
    autoUpdater.on("update-downloaded", () => { if (win) win.webContents.send("update-status", "Update ready. It will install when Vantacy restarts."); });
  }
}); app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});
