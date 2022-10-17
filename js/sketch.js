// making some sketches for Feeling Machines 2022


var img = [];
var imgMain;
var imgAspect = window.innerWidth/4;

     var rand1;
  var rand2;
  var rand3;

function preload() {
  // load images
    for (var i = 0; i<14;i++){
     img[i] = loadImage("js/models/" + i + ".png");
        
     }
    
    imgMain=loadImage("js/models/main.png");
    
}


function setup() {
canvas = createCanvas(innerWidth, innerHeight);
    canvas.parent('sketch-container');
  imageMode(CENTER);

       rand1 = ~~random(13);
  rand2 = ~~random(13);
   rand3 = ~~random(13);
    
    img[rand3].resize(imgAspect*.8, 0)
img[rand2].resize(imgAspect*.6, 0)
     img[rand1].resize(imgAspect, 0)
    
}

function draw() {
    background("#FDFCD1");
    
   // rotate(47+frameCount*0.004);
  //    imgMain.resize(500, 0)
    //image(imgMain,width/2,height/2);
    
    image(img[rand1], 239+(frameCount*0.04)+(mouseX*.007),600+frameCount*0.003+(mouseX*.005));
    image(img[rand2], 458+(frameCount*0.01),400-(frameCount*0.03));
    image(img[rand3], 760-(frameCount*0.01),360-(frameCount*0.06));
    

}

//function windowResized() {
//    resizeCanvas(window.innerWidth, window.innerHeight);
//    image(img1, width / 2, 600, imgSize);
//}


