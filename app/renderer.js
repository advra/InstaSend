const path = require('path');
const fs = require('fs');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(`Loading renderer.js...`);

if (process.platform == 'darwin') {
    document.body.innerHTML = `<webview src="https://www.instagram.com/" style="width:100%; height:100%"  preload="ig-preload.js" ></webview>`
}
else{
    document.body.innerHTML = `
    <nav id="nav">
        <div id="showTitle">
        </div>
            <div id="togglers">
            <div id="minimize"><span>-</span>
            </div>
            <div id="maximize"><span>[ ]</span>
            </div>
            <div id="close"><span>&times;</span>
            </div>
        </div>
    </nav>
    <br>
        <webview src="https://www.instagram.com/" style="width:100%; height:100%; overflow-x: hidden; " preload="ig-preload.js" ></webview>
    `
}

const webview = document.querySelector("webview");
webview.addEventListener("dom-ready", () => {
//   webview.openDevTools();
    webview.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
});