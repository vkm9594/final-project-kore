var screen = 0;
let stars = [];
var yoff = 0.0;
let root;
let tree = [];
let kore;
let sprite;

function preload() {
  sprite = loadImage("kore.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }

  var a = createVector(700, 600);
  var b = createVector(700, 500);
  root = new Branch(a, b);
  tree[0] = root;

  kore = new Character();
}

function draw() {
  background(0);

  // startColor = color(51, 58, 135);
  // stopColor = color(122, 51, 135);
  startColor = color(0, 145, 212);
  stopColor = color(247, 245, 163);
  verticalGradientRect(0, 0, windowWidth, windowHeight, startColor, stopColor);

  moon();

  // calls class Star
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
  }

  // draws the waves
  wave1();
  wave2();
  wave3();

  grassPlatform();

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  //tree[0].mousePressed();

  kore.show();
}

function mousePressed() { //adds new branches every time the mouse is pressed
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}