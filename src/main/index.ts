import * as path from "path";
import * as URL from "url";

import { app, BrowserWindow } from "electron";

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.maximize();

  mainWindow.on('close', () => {
    mainWindow = null;
  });

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`http://localhost:${ process.env.ELECTRON_WEBPACK_WDS_PORT }`);

  } else {
    mainWindow.loadURL(
      URL.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: "file:",
        slashes: true,
      })
    );
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

