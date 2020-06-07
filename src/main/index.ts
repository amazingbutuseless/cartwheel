import * as path from "path";
import * as URL from "url";

import { app, BrowserWindow, ipcMain } from "electron";

import WebsitesHandler from './websites_handler';
import ScreenshotsHandler from './screenshots_handler';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 400,
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

ipcMain.on('websites-get', WebsitesHandler.get.bind(WebsitesHandler));

ipcMain.on('website-add', WebsitesHandler.add.bind(WebsitesHandler));
ipcMain.on('website-update', WebsitesHandler.update.bind(WebsitesHandler));
ipcMain.on('website-remove', WebsitesHandler.delete.bind(WebsitesHandler));

ipcMain.on('screenshots-group-get', ScreenshotsHandler.list.bind(ScreenshotsHandler));
ipcMain.on('screenshots-group-delete', ScreenshotsHandler.delete.bind(ScreenshotsHandler));
ipcMain.on('screenshots-list', ScreenshotsHandler.get.bind(ScreenshotsHandler));
ipcMain.on('screenshots-take', ScreenshotsHandler.take.bind(ScreenshotsHandler));
ipcMain.on('screenshots-diff', ScreenshotsHandler.checkIfDifferent.bind(ScreenshotsHandler));
