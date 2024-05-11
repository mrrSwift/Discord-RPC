const RPC = require('discord-rpc')
global.data = require('./state.json');
const clientId = `${data.appinfo.clientID}`;
const fs = require('fs')
module.exports = () => {

  /////////////////////////Update Cache////////////////////////
  fs.watchFile(require.resolve('./state.json'), function () {
    console.log("Information  changed, reloading...\n");
    delete require.cache[require.resolve('./state.json')]
    global.data = require('./state.json');
    setTimeout(() => {


      if (data.modeplay.where === 'y') {
        setActivityingame();
      } else {
        setActivityinmenu();
      }
    }, 100);
  });
  ////////////////////////// end ////////////////////////////


  // Only needed if you want to use spectate, join, or ask to join
  RPC.register(clientId);

  const rpc = new RPC.Client({ transport: 'ipc' });
  const startTimestamp = new Date();
  console.log('Log in World of Warcraft ... \n\n ')


  /////////////////////function////////////////////
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

    console.log(`Activity update / in menu `)
    console.log(`Details: Character list`)
  }

  ///////////////////function end////////////////////


  //console.log(`${data.modeplay.where} `)
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

}