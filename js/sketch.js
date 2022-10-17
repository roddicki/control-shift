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
   
//top right
 image(img[rand3], 760-(frameCount*0.01),360-(frameCount*0.06));
    
    //top left
    image(img[rand2], 450+(frameCount*0.01),400-(frameCount*0.03));
    
    //bottom
        image(img[rand1], 239-(frameCount*0.04),600-frameCount*0.003);
    

}


