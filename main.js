const { app, BrowserWindow, globalShortcut } = require('electron')
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

let win;

function createWindow () {

  const options = {
    width: 500,
    height: 550,
    resizable: false,
    maximizable: false,
    movable: true,
    titleBarStyle: 'hiddenInset',
    title: 'InstaSend',
    webPreferences: {
			nodeIntegration: true
		},
  };

  // create main window
  win = new BrowserWindow(options)
  win.loadURL('https://'+DOMAIN_URL)

  // check if we are at the login page
  win.webContents.on('dom-ready', function (e) {
    win.webContents.executeJavaScript(`
      var ipcRenderer = require('electron').ipcRenderer;
      var hasLogin = document.getElementsByClassName("gr27e")[0];
      ipcRenderer.send('checkLogin', hasLogin);
      console.log("Send checklogin");
    `);
	});

  ipcMain.on('checkLogin', function(event, hasLogin){
    console.log("Recv checklogin");
    console.log(hasLogin);
    if(!hasLogin){
      win.resizable = true
      win.maximizable = true
      win.setSize(1100,950, true)
      win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/dash.css'), 'utf8'));
    }else{
      win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
    }

  })
}

app.on('ready', function(){
  createWindow()
});
