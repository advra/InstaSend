const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs');
const windowStateKeeper = require('electron-window-state');

let win;
let mainWindow;
var hasLoginForm = false;
let willQuitApp = false;

function createWindow () {

  let mainWindowState = windowStateKeeper({
		defaultWidth: 500,
		defaultHeight: 600,
	});

  const options = {
    minWidth: 500,
    minHeight: 600,
    x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
    resizable: true,
    maximizable: true,
    // movable: true,
    backgroundColor: '#FFF', // enable subpixel anti-aliasing
    frame: false,
    titleBarStyle: 'hidden',
    title: 'InstaSend',
    webPreferences: {
      nodeIntegration: false
		},
  };
  
  // create window with settings
  mainWindow = new BrowserWindow(options);
  mainWindowState.manage(mainWindow);
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL('https://instagram.com')

  
  mainWindow.webContents.once('dom-ready', ()=> {
    mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
  });
  
  // handling close
  mainWindow.on('close', e => {
		if (willQuitApp) {
			// the user tried to quit the app
			mainWindow = null;
			return;
		}

		// the user only tried to close the window
		e.preventDefault();
		if (!mainWindow) {
			return;
		}

		if (!mainWindow.isFullScreen()) {
			mainWindow.hide();
			return;
		}

		mainWindow.setFullScreen(false);
		// Wait for full screen animation to finish before hiding
		setTimeout(
			() => {
				mainWindow.hide();
			},
			1000
		);
	});

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
		event.preventDefault();

		if (url === 'about:blank') {
			if (frameName !== 'about:blank') {
				options.titleBarStyle = 'default';
				options.webPreferences.nodeIntegration = false;
				event.newGuest = new electron.BrowserWindow(options);
			}
		} else {
			shell.openExternal(url);
		}
	});
}

// app events
app.on('ready', createWindow);

app.on('before-quit', () => willQuitApp = true);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow) {
		mainWindow.show();
	} else {
		createWindow();
	}
});

// app.on('haschange', ()=> {
//   mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
//   mainWindow.webContents.executeJavaScript(`
//   hasLoginForm = document.getElementsByClassName("gr27e")[0];

//   if(!hasLoginForm){
//     console.log("no login");
//   }else{
//     console.log("login found");
//   }

// `)
// });