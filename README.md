# Hasanify
You can download mp3 from youtube and listen it.
<br>
<br>
<h3>NOTE:</h3>
<br>
If you will use electron-packager, you have to change at app.js line 118. It have to be like 115. Because index.html's location change when using electrpn-packager.
<br>
&GT; line 115 (now in comment line): <b>win.webContents.send("musicStartPlaying", [path.join(__dirname, "../../" + folder_path.substring(2) + "/" + data), data]);</b>
<br>
&GT; line 118 (now out of comment line): <b>win.webContents.send("musicStartPlaying", [path.join(__dirname + folder_path.substring(1), data), data]);</b>
