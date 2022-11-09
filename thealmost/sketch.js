// making some sketches for Feeling Machines 2022


var img = [];
var imgMain;
var imgAspect = innerWidth / 3;

let x3 = 760;
let y3 = 360;
let x3speed = -0.02;
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
    for (var i = 0; i < 14; i++) {
        img[i] = loadImage("models/" + i + ".png");

    }

    imgMain = loadImage("models/main.png");

}


function setup() {
    canvas = createCanvas(innerWidth, innerHeight);
    canvas.parent('sketch-container');
    imageMode(CENTER);

    rand1 = ~~random(13);
    rand2 = ~~random(13);
    rand3 = ~~random(13);

    img[rand3].resize(imgAspect * .8, 0)
    img[rand2].resize(imgAspect * .6, 0)
    img[rand1].resize(imgAspect, 0)

}

function draw() {
    background("#f3c3d2");

    //    fill(255, 0, 0);
    //    textSize(30);
    //    textAlign(CENTER, CENTER);
    //    text("center", innerWidth/2, innerHeight/2);


    // set speeds
    x3 += x3speed;
    y3 += y3speed;
    x2 += x2speed;
    y2 += y2speed;

    x1 += x1speed;
    y1 += y1speed;

    // draw image
    //top right
    image(img[rand3], x3, y3);

    //top left
    image(img[rand2], x2, y2);

    //bottom
    image(img[rand1], x1, y1);


    // make conditions for chaning direction


    if (x3 > innerWidth - (img[rand3].width / 2) || x3 < (img[rand3].width / 2)) {
        x3speed = -x3speed;
    }
    if (y3 > innerHeight - (img[rand3].height / 2) || y3 < (img[rand3].height / 2)) {
        y3speed = -y3speed;
    }

    if (x1 > innerWidth - (img[rand1].width / 2) || x1 < (img[rand1].width / 2)) {
        x1speed = -x1speed;
    }
    if (y1 > innerHeight - (img[rand1].height / 2) || y1 < (img[rand1].height / 2)) {
        y1speed = -y1speed;
    }

    if (x2 > innerWidth - (img[rand2].width / 2) || x2 < (img[rand2].width / 2)) {
        x2speed = -x2speed;
    }
    if (y2 > innerHeight - (img[rand2].height / 2) || y2 < (img[rand2].height / 2)) {
        y2speed = -y2speed;
    }

}
