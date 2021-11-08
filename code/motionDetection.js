const webcamElement = document.getElementById('webcam');
const webcam = new Webcam(webcamElement, 'user')
let timeOut, lastImageData;
let canvasSource = $("#canvas-source")[0];
let canvasBlended = $("#canvas-blended")[0];
let contextSource = canvasSource.getContext('2d');
let contextBlended = canvasBlended.getContext('2d');
let drums = {};
const audioPath =  "sound"

contextSource.translate(canvasSource.width, 0);
contextSource.scale(-1, 1);

$("#webcam-switch").change(function () {
    if(this.checked){
        $('.md-modal').addClass('md-show');
        webcam.start()
            .then(result =>{
              cameraStarted();
              loadSounds();
              startMotionDetection();
            })
            .catch(err => {
                displayError();
            });
    }
    else {        
        $("#errorMsg").addClass("d-none");
        webcam.stop();
        cameraStopped();
        setAllDrumReadyStatus(false);
    }        
  });
  