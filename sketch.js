var screen = 0;
let fade = 0;
let stars = [];
let grass = [];
var yoff = 0.0;
let root;
let tree = [];
let flowers = [];
let kore;
let sprite;
let boat;
let notes = [60, 62, 64, 65, 67, 69, 71, 72];
var index = 0;
var trigger = 0;
let osc;
let soundClassifier;
var count = 0;

function preload() {
  const options = {
    probabilityThreshold: 0.9
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, setup);
  sprite = loadImage("images/kore.gif");
  boat = loadImage("images/boat.png")
  screen = 0;
}

function setup() {
  screen = 0;
  createCanvas(windowWidth - 2, windowHeight - 3);

  for (let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }
 
  kore = new Character();

  osc = new p5.TriOsc();
  osc.start();
  osc.amp(0);
  soundClassifier.classify(gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
    // console.log(results, soundClassifier.confidence);
  if (results[0].label === 'go') {
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - 200);
    root = new Branch(a, b);
    tree[0] = root;
    console.log(results[0].label, results[0].confidence)
  }
  if(results[0].label === 'down') {
    for(let i = 0; i < flowers.length; i++) {
      flowers[i].y += random(0, 3);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  osc.fade(0.5, 0.2);
  if (duration) {
    setTimeout(function () {
      osc.fade(0, 0.2);
    }, duration - 50);
  }
}

function draw() {
  background(0);
  if (screen == 0) {
    textSize(150);
    textFont("megrim");
    fill(255, 255, 255, fade);
    fade++;
    text("Kore", width / 2 - 180, height / 2);
    textSize(24);
    text("Press enter to begin", width / 2 - 135, height / 2 + 50);
  }

  if (screen == 1) {
    startColor = color(0, 145, 212);
    stopColor = color(247, 245, 163);
    verticalGradientRect(0, 0, windowWidth, windowHeight, startColor, stopColor);
    moon();

    for (let i = 0; i < stars.length; i++) { //calls class Star in background.js
      stars[i].show();
    }

    // draws the waves
    wave1();
    wave2();
    wave3();

    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    for (let i = 0; i < flowers.length; i++) {
      fill(255, 0, 100);
      ellipse(flowers[i].x, flowers[i].y, 10, 10);
    }

    // kore.update();
    // kore.show();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    screen = 1;
  }
}

// function mousePressed(event) {
//   if (event.button == 0 && event.clientX < width && event.clientY < height) {
//     let key = floor(map(mouseX, 0, width, 0, notes.length));
//     playNote(notes[key]);
//   }
// }

function mouseReleased() {
  osc.fade(0, 0.5);
}

function mousePressed() { //adds new branches every time the mouse is pressed
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      //console.log(tree[i]);
    }
    tree[i].finished = true;
  
    let key = floor(map(mouseY, height, 0, 0, notes.length));
    playNote(notes[key]);
  }
  count++;

  if (count === 8) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let flower = tree[i].end.copy();
        flowers.push(flower);
      }
    }
  }
}