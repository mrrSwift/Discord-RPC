var ipc = require('electron').ipcRenderer;
const preData = require('./state.json')
const pfp = (item) => {
    switch (item) {
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
}
document.getElementById('title').value = preData.info.details
document.getElementById('status').value = preData.info.state
document.getElementById('class').value = preData.info.largeImageText
document.getElementById('faction').value = preData.info.smallImageText
document.getElementById('titlee').innerText = preData.info.details
document.getElementById('statuss').innerText = preData.info.state
pfp(preData.info.largeImageText)

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
    pfp(data.info.largeImageText)


    ipc.send('update', data)


});

const remote = require('electron').remote;

const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}