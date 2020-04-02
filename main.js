const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs');


const DOMAIN_URL = "instagram.com"
let mainWindow;
let isQuittingApp = false;

function createWindow () {

  const options = {
    resizable: false,
    fullscreen: false,
    maximizable: false,
    titleBarStyle: 'hiddenInset',
    title: 'InstaSend',
    webPreferences: {
			nodeIntegration: false
		},
  };

  // create window with settings
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL('https://instagram.com')

  // apply css
  mainWindow.webContents.on('dom-ready', () => {
		mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
	});

}

app.whenReady().then(createWindow)
