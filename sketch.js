let stars = [];
let yoff = 0.0;
let root;
let tree = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }

  var a = createVector(mouseX, mouseY);
  var b = createVector(mouseX, mouseY - 100);
  root = new Branch(a, b);
  tree[0] = root;
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
  tree[0].mousePressed();
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

function verticalGradientRect(x, y, w, h, startColor, stopColor) { //gradient for the background
  push();
  strokeWeight(1);
  for (let i = 0; i < h; i++) {
    stroke(lerpColor(startColor, stopColor, i / (h - 1)));
    line(x, y + i, w + x, y + i);
  }
  noFill();
  noStroke();
  rect(x, y, w, h);
  pop();
}

function moon() {
  noStroke();
  fill(250, 250, 250);
  push();
  translate(210, 230);
  scale(2.5, 2.5);
  rotate(PI);
  beginShape();
  vertex(30, 20);
  bezierVertex(80, 20, 80, 75, 30, 75);
  bezierVertex(50, 75, 70, 35, 30, 20);
  endShape();
  pop();
}

// draws stars
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(0, 350);
    this.size = random(0.25, 2);
    this.t = random(TAU); //TWO_PI
  }

  show() {
    angleMode(RADIANS);
    this.t += 0.1;
    var scale = this.size + sin(this.t) * 2;
    noStroke();
    ellipse(this.x, this.y, scale, scale);
  }
}

function wave1() {
  fill(22, 70, 224, 90);
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 400, 450);
    vertex(x, y);
    xoff += 0.05;
  }

  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function wave2() {
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 450, 500);
    vertex(x, y);
    xoff += 0.05;
  }

  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function wave3() {
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 550, 600);
    vertex(x, y);
    xoff += 0.05;
  }

  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function grassPlatform() {
  fill('green');
  ellipse(width / 2, 500, 500, 120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}