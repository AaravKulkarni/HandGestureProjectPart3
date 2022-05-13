Prediction1 = "";
Prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function ClickPicture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedimg" src="'+data_uri+'"/>'
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5MbQ26GNA/model.json', modelLoaded);
function modelLoaded(){ 
    console.log("Model Loaded !");
}
function check(){
    img = document.getElementById("capturedimg");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("handgesturename").innerHTML = results[0].label;
        document.getElementById("handgesturename2").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();
        if(results[0].label == "Thumb Up"){
            document.getElementById("handgetureemoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Peace Out"){
            document.getElementById("handgetureemoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Thumbs Down"){
            document.getElementById("handgetureemoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "Amazing"){
            document.getElementById("handgetureemoji").innerHTML = "&#128076;";
        }
        if(results[1].label == "Thumb Up"){
            document.getElementById("handgestureemoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Peace Out"){
            document.getElementById("handgestureemoji2").innerHTML = "&#9996;";
        }
        if(results[1].label == "Thumbs Down"){
            document.getElementById("handgestureemoji2").innerHTML = "&#128078;";
        }
        if(results[1].label == "Amazing"){
            document.getElementById("handgestureemoji2").innerHTML = "&#128076;";
        }
    }
}
function speak(){
    var synth = window.speechSynthesis;
    Speech1 = "the first prediction is " + Prediction1;
    speech2 = "and the second prediction is " + Prediction2;
    var utterThis = new SpeechSynthesisUtterance(Speech1 + speech2);
    synth.speak(utterThis);
}