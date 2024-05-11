const { app, BrowserWindow, ipcMain } = require('electron');
const rpc = require('./discordRPC');
const path = require('path');
const fs = require('fs');
let mainWindow
function createWindow () {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 450,
    height: 780,
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


  mainWindow.loadFile('index.html')


}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
ipcMain.on('update',(event, value)=>{
   fs.writeFileSync('./state.json',JSON.stringify(value))
})

ipcMain.on('minimize',(event, value)=>{
  mainWindow.minimize()
})

ipcMain.on('maximize',(event, value)=>{
  mainWindow.maximize()
})

ipcMain.on('unmaximize',(event, value)=>{
  mainWindow.unmaximize()
})

ipcMain.on('close',(event, value)=>{
  mainWindow.close()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
rpc()

