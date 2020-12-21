const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs');
// const windowStateKeeper = require('electron-window-state')

let win;
let loginForm;

function createWindow () {

  const options = {
    width: 500,
    height: 550,
    // resizable: true,
    // maximizable: true,
    // movable: true,
    frame: false,
    titleBarStyle: 'hidden',
    title: 'InstaSend',
    webPreferences: {
			nodeIntegration: false
		},
  };

  // create window with settings
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL('https://instagram.com')

  mainWindow.webContents.on('dom-ready', function (e) {
    mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
  });

  // check if we are at the login page //dom-ready
  // win.webContents.on('dom-ready', function (e) {
  //   win.webContents.executeJavaScript(`
  //     var ipcRenderer = require('electron').ipcRenderer;
  //     var hasLogin = document.getElementsByClassName("gr27e")[0];
  //     ipcRenderer.send('checkLogin', hasLogin);
  //     console.log("Send checklogin");
  //   `);
	// });
  //
  // ipcMain.on('checkLogin', function(event, hasLogin){
  //   console.log("Recv checklogin");
  //   if(!hasLogin){
  //     win.resizable = true
  //     win.maximizable = true
  //     win.setSize(1100,950, true)
  //     win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/dash.css'), 'utf8'));
  //   }else{
  //     win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
  //   }
  //
  // })
}

app.on('ready', createWindow);
