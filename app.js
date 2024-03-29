const electron = require("electron");
const { app, BrowserWindow, ipcMain} = electron;
const url = require("url");
const path = require("path");

const fs = require("fs");
const ytdl = require("ytdl-core");




var win;
const folder_path = "./HASANIFY_MUSICS";


async function downloadMusic(youtubeMusicUrl) {
    win.webContents.send("downloading", "0%");

    try {
        const info = await ytdl.getInfo(youtubeMusicUrl);

        const stream = ytdl(youtubeMusicUrl, {
            filter: "audioandvideo"
        });
        
        var progress = 0;
        stream.on("progress", (chunkLength, downloaded, total) => {
            progress = (downloaded / total) * 100;
            win.webContents.send("downloading", progress.toFixed(2).toString() + "%");
        });

        
        if (!fs.existsSync(folder_path)) {
            fs.mkdirSync(folder_path);
        }

        var titleName = info.videoDetails.title.replace(/['"”`\\/<>%&+:*?|#]/g, '^').substring(0, 60) + ".mp3"; // '^' -> '\\$&'
        stream.pipe(fs.createWriteStream(folder_path + "/" + titleName));
        
    } catch (err) {
        win.webContents.send("downloading", "You Used an Invalid Link.");
    }
}


function musicFilesNames() {
    
    if (!fs.existsSync(folder_path)) {
        fs.mkdirSync(folder_path);
    }

    const files = fs.readdirSync(folder_path);

    const mp3s = files.filter(file => {
        if (fs.lstatSync(`${folder_path}/${file}`).isFile() && file.endsWith(".mp3")) {
            return true;
        }
        return false;
    });

    win.webContents.send("musicFilesNames", mp3s);
}



app.on("ready", () => {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        width: 600,
        height: 500,
        resizable: false,
        
        backgroundColor: "#7B2869"
    });
    win.loadURL(
        url.format(
            {
                pathname: path.join(__dirname, "index.html"),
                protocol: "file",
                slashes: true
            }
        )
    );
    
    win.setMenu(null);

    

    musicFilesNames();
    ipcMain.on("reloadMusicList", (event, data) => {
        musicFilesNames();
    })

    ipcMain.on("addMusic", (event, data) => {
        downloadMusic(data.toString());
    });

    ipcMain.on("removeMusic", (event, data) => {
        fs.rmSync(folder_path + "/" + data, {
            force: true,
        });
        musicFilesNames();
    });



    ipcMain.on("openMusic", (event, data) => {

        /*
        
            If you will use electron-packager, you have to change line 118. It have to be like 115.

            win.webContents.send("musicStartPlaying", [path.join(__dirname, "../../" + folder_path.substring(2) + "/" + data), data]);
        
        */
        win.webContents.send("musicStartPlaying", [path.join(__dirname + folder_path.substring(1), data), data]);
    });

});