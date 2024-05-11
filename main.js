const { app, BrowserWindow, ipcMain } = require('electron');
const rpc = require('./discordRPC');
const path = require('path');
const fs = require('fs');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 780,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
rpc()

