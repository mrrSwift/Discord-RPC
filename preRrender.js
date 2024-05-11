var ipc = require('electron').ipcRenderer;
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
            largeImageKey: document.getElementById('class').value.toLowerCase().replace(" ","_")
        },
        class: {
            smallImageKey: document.getElementById('faction').value.toLowerCase().replace(" ","_")
        },
        modeplay: {
            waudoing: "idle",
            where: "y"
        }
    }
    document.getElementById('titlee').innerText = document.getElementById('title').value
    document.getElementById('statuss').innerText = document.getElementById('status').value

    ipc.send('update',data)


});