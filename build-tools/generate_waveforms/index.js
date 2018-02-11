var ws = WaveSurfer.create({
    container: "#waveform",
    waveColor: 'violet',
    progressColor: 'purple',
    cursorWidth: 0,
    // backend: 'MediaElement'
});

ws.on('ready', () => {
    // for some reason, waveform-ready fires *prior* to the draw action. 
    // the delay just needs to be one cycle, to ensure the DOM updates
    setTimeout(() => {
        document.querySelector("#waveform > wave > canvas").toBlob(function (blob) {
            var newImg = document.createElement('img'),
                url = URL.createObjectURL(blob);
          
            newImg.onload = function() {
              // no longer need to read the blob so it's revoked
              URL.revokeObjectURL(url);
            };
          
            newImg.src = url;
            document.body.appendChild(newImg);
        });
    })
})

var urlParms = new URLSearchParams(window.location.search);
var path = urlParms.get('path');
if(path) 
    ws.load(path);