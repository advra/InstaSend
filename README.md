# InstaSend

InstaSend is a macOS and windows client for Instagram. Instagram revoked API access terminating many well known clients years ago. This is a single-site browser application that injects some CSS and JS to provide a better user experience on desktop devices.

Note: Some overhaul with the menu will need to be to make Windows version more usable.

![preview image](preview.gif)

## Download
Grab the latest version in [Releases](https://github.com/advra/InstaSend/releases).

## Feature Request
I am open to requests and recommendations. Feel free to discuss or open issues. Not all features will be implemented as the single goal is to make this lightweight.

## Build and Debug
```
npm install
npm run start
```

## Deployment
The app can easily be built for windows or mac running the following command (assuming you already ran `npm install`)
```
sudo npm run dist
```

## Todo
```
[x] - inject css for better UX
[x] - add windowStateKeeper
[x] - app closing and recovery
[ ] - add custom traffic light to use with OSX and Windows
[ ] - fix ipc for login and dashboard
[ ] - notifications
[ ] - night-mode
```
