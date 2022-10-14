// making some sketches for Feeling Machines 2022

var img1;
var img2;
var imgSize = 1;

var visuals;
var visTex;

function preload() {
  // load images
  img1 = loadImage("js/test1.png");
      img2 = loadImage("js/test2.png");
    
      // Load model with normalise parameter set to true
  visuals = loadModel('js/test1obj.obj', true);
    visTex = loadImage("js/test3.png");
}


function setup() {
canvas = createCanvas(innerWidth, innerHeight, WEBGL);
    canvas.parent('sketch-container');
   // canvas.style("z-index","-1")
 // createCanvas(750, 500);
  imageMode(CENTER);
  //noStroke();
 // background("#2d99ac");

}

function draw() {
background("#FDFCD1");
//stretchImage();
    floatingShape();
}

function windowResized() {
    resizeCanvas(window.innerWidth, setHeight());
    image(img11, width / 2, 600, imgSize);
}


function stretchImage(){
  //    image(img1, width/2, height / 2, innerWidth+imgSize);
     image(img2, width/2, height / 2, innerWidth+imgSize);
  imgSize=imgSize+(frameCount*0.001)
    //print(imgSize);
    
}

function floatingShape(){
 
     translate(0,0,337+frameCount*0.001);
  rotateZ(frameCount*0.0001+mouseX*0.0001);
      rotateY(frameCount*0.001+mouseY*0.0001);
    texture(visTex);
  model(visuals);
    
}