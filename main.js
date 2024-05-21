objects=[]
status1=""

function preload(){

    
}
function setup(){
canvas=createCanvas(480,380)
canvas.center()

camera=createCapture(VIDEO)
camera.size(480,380)
camera.hide()

}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{

        console.log(results)
        objects=results
    }


}
function draw(){
    image(camera,0,0,480,380)
    if(status1 != ""){

        objectDetector.detect(camera, gotResult)

        for(i=0 ; i<objects.length ; i++){

            document.getElementById("status").innerHTML="Status: Objects Detected"
            document.getElementById("noo").innerHTML="Number of Objects Detected are: " + objects.length

            fill("red")
            percent=floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == object_name){


                objectDetector.detect(gotResult)
                document.getElementById("status").innerHTML= object_name + " found"
                synth=window.speechSynthesis
                utterthis=new SpeechSynthesisUtterance(object_name + "found")
                synth.speak(utterthis)
            }
            else{
                document.getElementById("status").innerHTML= object_name + " not found"
            }
        }
    }
  
}

function Start(){

objectDetector=ml5.objectDetector('cocossd', modelLoaded)
document.getElementById("status").innerHTML="Status: Detecting Objects"
object_name=document.getElementById("input_box").value


}
function modelLoaded(){

    console.log("Model Loaded")
    status1=true

}
