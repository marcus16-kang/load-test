const {ipcRenderer} = require('electron');

const sendNotification = (status, statusText, body) => {
    ipcRenderer.send('error', {title: status + ' ' + statusText, body: body});
}