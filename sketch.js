let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  background(0);

  startColor = color(51, 58, 135);
  stopColor = color(122, 51, 135);
  verticalGradientRect(0, 0, 1200, 700, startColor, stopColor);
  
  moon();

  // calls class Star
  for(let i = 0; i < stars.length; i++) {
    stars[i].show();
  }
}

function verticalGradientRect(x, y, w, h, startColor, stopColor) {
  push();
  strokeWeight(1);
  for(let i = 0; i < h; i++) {
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
  angleMode(DEGREES);
  rotate(180);
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
    this.x = random(0, 1200);
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