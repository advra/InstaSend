// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(`Loading renderer.js...`);

if (process.platform == 'darwin') {
    document.body.innerHTML = `<h1>MAC</h1><webview src="https://www.instagram.com/" style="width:100%; height:100%"  preload="ig-preload.js" ></webview>`
}
else{
    document.body.innerHTML = `<h1>WINDOWS/LINUX</h1><webview src="https://www.instagram.com/" style="width:100%; height:100%; overflow-x: hidden; " preload="ig-preload.js" ></webview>`
}

const webview = document.querySelector("webview");
webview.addEventListener("dom-ready", () => {
//   webview.openDevTools();
    // webview.insertCSS(fs.readFileSync(path.join(__dirname, '/assets/ig.css'), 'utf8'));
});