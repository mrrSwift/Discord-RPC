var ipc = require('electron').ipcRenderer;
document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777911030050193459.png"
document.getElementById("submit-form").addEventListener("click", () => {
    const data = {
        appinfo: {
            clientID: "770951797103263755"
        },
        info: {
            details: document.getElementById('title').value,
            state: document.getElementById('status').value,

            largeImageText: document.getElementById('class').value,

            smallImageText: document.getElementById('faction').value

        },
        zone: {
            largeImageKey: document.getElementById('class').value.toLowerCase().replace(" ", "_")
        },
        class: {
            smallImageKey: document.getElementById('faction').value.toLowerCase().replace(" ", "_")
        },
        modeplay: {
            waudoing: "idle",
            where: "y"
        }
    }
    document.getElementById('titlee').innerText = data.info.details
    document.getElementById('statuss').innerText = data.info.state

    switch (data.info.largeImageText) {
        case "Warrior":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887818687971348.png"
            break;
        case "Paladin":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887829731835915.png"
            break;
        case "Hunter":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887816373895188.png"
            break;
        case "Rogue":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887821687422987.png"
            break;
        case "Priest":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887822492205066.png"
            break;
        case "Shaman":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887828096712726.png"
            break;
        case "Mage":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887810555871274.png"
            break;
        case "Druid":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887827458261002.png"
            break;
        case "Demon Hunter":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887826892816394.png"
            break;
        case "Death Knight":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777887826855198761.png"
            break;
        case "Evoker":
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777911030050193459.png"
            break;
        default:
            document.getElementById('pfpicon').src = "https://cdn.discordapp.com/app-assets/770951797103263755/777911030050193459.png"
            break;
    }

    ipc.send('update', data)


});