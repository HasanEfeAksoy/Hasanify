# Hasanify
You can download mp3 from youtube and listen it.
<br>
<br>
<h3>NOTE:</h3>
Hasanify may require update. (ytdl-core)
<br>
<br>
If you will use electron-packager, you have to change at app.js line 120. It have to be like 117. Because index.html's location change when using electron-packager.
<br>
&GT; line 117 (now in comment line): <b>win.webContents.send("musicStartPlaying", [path.join(__dirname, "../../" + folder_path.substring(2) + "/" + data), data]);</b>
<br>
&GT; line 120 (now out of comment line): <b>win.webContents.send("musicStartPlaying", [path.join(__dirname + folder_path.substring(1), data), data]);</b>
