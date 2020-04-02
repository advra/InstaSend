const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs');

const {ipcMain} = require('electron')

const DOMAIN_URL = "instagram.com"
const DOMAIN_ACTIVITY = "/accounts/activity"
const DOMAIN_MESSAGES = "/direct/inbox"
const DOMAIN_EXPLORE = "/explore"
const DOMAIN_SETTINGS_ACCOUNT = "/accounts/edit"
const DOMAIN_SETTINGS_PASS = "accounts/password/change"
const DOMAIN_SETTINGS_APPS = "accounts/manage_acceess"
const DOMAIN_SETTINGS_EMAIL_SMS = "emails/settings"
const DOMAIN_SETTINGS_PRIVACY_SECURITY = "/accounts/privacy_and_security"
const DOMAIN_LOGIN_ACTIVITY = "/session/login_activity"
const DOMAIN_SETTINGS = "/emails/settings"

let mainWindow;
let uploadButton;
let isQuittingApp = false;
let isLoggedIn = true;

function createLoginWindow () {

  const options = {
    width: 500,
    height: 600,
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
  mainWindow.loadURL('https://'+DOMAIN_URL)

  // apply css
  mainWindow.webContents.on('dom-ready', () => {
		mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
	});

}

function createDashboardWindow () {

  const options = {
    width: 800,
    height: 950,
    resizable: true,
    maximizable: true,
    titleBarStyle: 'hiddenInset',
    title: 'InstaSend',
    webPreferences: {
			nodeIntegration: false
		},
  };

  // create window with settings
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL('https://'+DOMAIN_URL)

  // apply css
  mainWindow.webContents.on('dom-ready', () => {
		mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/dash.css'), 'utf8'));
	});

}

// function backgroundUpload() {
//   const hidden = ({
//     show: true
//   });
//
//   invisibleWin = new BrowserWindow(hidden)
//   invisibleWin.loadURL('https://'+DOMAIN_URL)
//
//   // force mobile (capture upload button for our website)
//   invisibleWin.webContents.setUserAgent("Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko; googleweblight) Chrome/38.0.1025.166 Mobile Safari/535.19");
//   invisibleWin.webContents.on('dom-ready', () => {
//     // add cs to change our view
// 		invisibleWin.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/dash.css'), 'utf8'));
// 	});
//   // let output = invisibleWin.webContents
//   // console.log(output)
// }

// app.whenReady().then(createWindow)
app.on('ready', function(){
  //open window
  if(!isLoggedIn){
    createLoginWindow()
  }else{
    createDashboardWindow()
  }
});
