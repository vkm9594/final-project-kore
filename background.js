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
      let y = map(noise(xoff, yoff), 0, 1, 500, 550);
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
      let y = map(noise(xoff, yoff), 0, 1, 550, 600);
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
      let y = map(noise(xoff, yoff), 0, 1, 600, 650);
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
    ellipse(width / 2, 600, 500, 120);
  }