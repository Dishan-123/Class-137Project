objects = [];
video = "";
status = "";
input  = "";

function setup()
{
    canvas = createCanvas(400,300);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start()
{
    objectdetector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
    input = document.getElementById("inpt").value;
}

function modelloaded()
{   
    console.log("MODEL HAS BEEN LOADED");
    status = true;
}

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results);
    objects = results;       
}

function draw()
{
    image (video,0,0,400,300);
    if(status != "")
    {
        objectdetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status: OBJECT DETECTED";            
            fill("#ff0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height); 
            
            if(objects[i].label == input)
        {
            video.stop();
            objectdetector.detect(gotresults);
            document.getElementById("odond").innerHTML = input + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input +" Found");
            synth.speak(utterThis);
        }
        else
        {
            document.getElementById("odond").innerHTML = input +" Not Found"; 
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input +" Not Found");
            synth.speak(utterThis);     
        }
        }
    }
}