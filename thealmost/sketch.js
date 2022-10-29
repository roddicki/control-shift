// making some sketches for Feeling Machines 2022


var img = [];
var imgMain;
var imgAspect = innerWidth/3;

let x3 = 760;
let y3 = 360;
let x3speed = -0.1;
let y3speed = -0.06;

let x2 = 450;
let y2 = 400;
let x2speed = 0.02;
let y2speed = -0.03;

let x1 = 239;
let y1 = 600;
let x1speed = -0.05;
let y1speed = 0.008;

var rand1;
var rand2;
var rand3;

function preload() {
  // load images
    for (var i = 0; i<14;i++){
     img[i] = loadImage("models/" + i + ".png");
        
     }
    
    imgMain=loadImage("models/main.png");
    
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
    background("#f3c3d2");
    
//    fill(255, 0, 0);
//    textSize(30);
//    textAlign(CENTER, CENTER);
//    text("center", innerWidth/2, innerHeight/2);
   

 x3 += x3speed;
  y3 += y3speed;
     x2 += x2speed;
  y2 += y2speed;
    
    x1 += x1speed;
  y1 += y1speed;


    //   rand_img_3X = 760-(frameCount*0.01);
     //rand_img_3Y= 360-(frameCount*0.06);
  //  rand_img_3Y= 360-(frameCount);

    //top right
 image(img[rand3],x3, y3);
    
    //top left
    image(img[rand2], x2, y2);
    
    //bottom
        image(img[rand1], x1,y1);
    
     if (x1 > innerWidth || x1 < 0) {
    x1speed = -x1speed;
  }
  if (y1 > innerHeight || y1 < 0) {
    y1speed = -y1speed;
  }
    
         if (x2 > innerWidth || x2 < 0) {
    x2speed = -x2speed;
  }
  if (y2 > innerHeight || y2 < 0) {
    y2speed = -y2speed;
  }
    
if (x3 > innerWidth || x3 < 0) {
    x3speed = -x3speed;
  }
  if (y3 > innerHeight || y3 < 0) {
    y3speed = -y3speed;
  }

}


