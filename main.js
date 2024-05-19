const { app, BrowserWindow, ipcMain } = require('electron');
const manager = require('./discordRPC')


let win
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 450,
    height: 485,
    icon:"wowicon.png",
    frame: true,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  win.loadFile('index.html')
}


app.whenReady().then(async () => {
  createWindow()
  manager()
});




ipcMain.on('minimize', (event, value) => {
  win.minimize()
})

ipcMain.on('maximize', (event, value) => {
  win.maximize()
})

ipcMain.on('unmaximize', (event, value) => {
  win.unmaximize()
})

ipcMain.on('close', (event, value) => {
  win.close()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



