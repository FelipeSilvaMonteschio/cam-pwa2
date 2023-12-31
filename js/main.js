if('serviceWorker' in navigator){
    window.addEventListener('load', async () => {
        try{
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', { type: "module"});

            console.log("service Worker registrada", reg);
        }catch(err){
            console.log('service Woker falhou', err)
        }
    })
}

var camMode = "user"

var constraints = {video : {facingMode: camMode }, audio: false}

const cameraView = document.querySelector('#camera--view'),
    cameraOutput = document.querySelector('#camera--output'),
    cameraSensor = document.querySelector('#camera--sensor'),
    cameraTrigger = document.querySelector('#camera--trigger'),
    cameraSwitcher = document.querySelector('#camera--inverter')

function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        let track = stream.getTracks()[0];
        cameraView.srcObject = stream
    })
    .catch(function (error) {
        console.error("ocorreu um Erro.", error)
    })
}

cameraSwitcher.onclick = function() {
    stopMediatracks(cameraView.srcObject);
    camMode = camMode === "user" ? "environment" : "user";
    constraints = {video: {facingMode: camMode}, audio:false}
    console.log(constraints)
    cameraStart();
}

function stopMediatracks(stream) {
    stream.getTracks().forEach(track => {
        track.stop()
    });
}

cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add('taken')
}

window.addEventListener("load", cameraStart, false)