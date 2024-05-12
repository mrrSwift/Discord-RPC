const { app, BrowserWindow, ipcMain } = require('electron');
const RPC = require('discord-rpc')
const clientId = `770951797103263755`;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const defualtDB = {
  id: "sw",
  appinfo: { clientID: "770951797103263755" },
  info: {
    details: "Swiftlly",
    state: "Away",
    largeImageText: "Priest",
    smallImageText: "Alliance"
  },
  zone: { largeImageKey: "priest" },
  class: { smallImageKey: "alliance" },
  modeplay: { waudoing: "idle", where: "y" }
}


let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
  mainWindow.loadFile('index.html')
}


app.whenReady().then(async () => {
  createWindow()

  const char = await db.get("char");

  if (!char) {
    await db.set("char", defualtDB);
  }
  let data = char
  mainWindow.webContents.send('updater',char)

  ipcMain.on('update', async (event, value) => {
    await db.set("char", value);
    data = value
    mainWindow.webContents.send('updater',value)
    if (data.modeplay.where === 'y') {
      setActivityingame();
    } else {
      setActivityinmenu();
    }
  })
  RPC.register(clientId);

  const rpc = new RPC.Client({ transport: 'ipc' });
  const startTimestamp = new Date();
  console.log('Log in World of Warcraft ... \n\n ')

  async function setActivityingame() {



    rpc.setActivity({
      details: `${data.info.details}`,
      state: `${data.info.state}`,
      startTimestamp,
      largeImageKey: `${data.zone.largeImageKey}`,
      largeImageText: `${data.info.largeImageText}`,
      smallImageKey: `${data.class.smallImageKey}`,
      smallImageText: `${data.info.smallImageText}`,
      instance: false,
    });

    console.log(`Activity update / in game \n`)
    console.log(`Name:${data.info.details}    \nClass And Talent: ${data.info.state}    \nClass:${data.info.largeImageText}    \nTeam:${data.info.smallImageText}    \n`)

  }

  async function setActivityinmenu() {



    rpc.setActivity({
      details: `Character list`,
      state: `${data.modeplay.waudoing}`,
      startTimestamp,
      largeImageKey: `main`,
      instance: false,
    });

  }

  rpc.on('ready', () => {
    // if "where"= x : Player in Menu  
    // if "where"= y : Player in Game 


    if (data.modeplay.where === 'y') {
      setActivityingame();
    } else {
      setActivityinmenu();
    }


  });

  rpc.login({ clientId }).catch(console.error);
  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})



ipcMain.on('minimize', (event, value) => {
  mainWindow.minimize()
})

ipcMain.on('maximize', (event, value) => {
  mainWindow.maximize()
})

ipcMain.on('unmaximize', (event, value) => {
  mainWindow.unmaximize()
})

ipcMain.on('close', (event, value) => {
  mainWindow.close()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})





/////////////////////function////////////////////




