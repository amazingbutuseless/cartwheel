import { app, BrowserWindow } from 'electron';

const path = require('path');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });
    
    mainWindow.loadURL('https://google.com');
}

app.on('ready', createWindow);
