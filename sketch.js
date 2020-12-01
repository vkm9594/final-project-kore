function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  startColor = color(51, 58, 135);
  stopColor = color(122, 51, 135);
  verticalGradientRect(218, 53, 1000, 550, startColor, stopColor);
  
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
