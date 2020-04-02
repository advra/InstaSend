const { app, BrowserWindow } = require('electron')

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
}

app.whenReady().then(createWindow)
