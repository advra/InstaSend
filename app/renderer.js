// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.body.innerHTML = `
    <H1>This is a placeholder</h1>
    <webview src="https://www.instagram.com/" style="width:100%; height:100%"></webview>

`

const webview = document.querySelector("webview");
webview.addEventListener("dom-ready", () => {
//   webview.openDevTools();
});