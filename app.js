const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'static/img/favicon.png')
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('ready', () => {
        if (process.platform === 'win32') {
            app.setAppUserModelId("Load test");
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.on('error', (event, payload) => {
        new Notification({
            title: payload.title,
            body: payload.body,
            icon: path.join(__dirname, 'static/img/favicon.png')
        }).show();
    });
});