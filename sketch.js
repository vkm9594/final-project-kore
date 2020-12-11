var screen = 0;
let stars = [];
let grass = [];
var yoff = 0.0;
let root;
let tree = [];
let leaves = [];
let kore;
let sprite;
let boat;
let notes = [60, 62, 64, 65, 67, 69, 71, 72];
let index = 0;
let trigger = 0;
let osc;
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 0.7
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

  var a = createVector(700, height);
  var b = createVector(700, height - 200);
  root = new Branch(a, b);
  tree[0] = root;

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
  if (results == 'one') {
    console.log(results, soundClassifier.confidence);
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
  // if (screen == 0) {
  //   textSize(72);
  //   fill(255);
  //   text("KORE", width / 2 - 100, height / 2);
  //   textSize(24);
  //   text("Press enter to begin", width / 2 - 110, height / 2 + 50);
  // }

  if (screen == 0) {
    // let w = width / notes.length;
    // for (let i = 0; i < notes.length; i++) {
    //   let x = i * w;
    //   if (mouseX > x && mouseX < x + w && mouseY < height) {
    //     if (mouseIsPressed) {
    //       fill(100, 255, 200);
    //     } else {
    //       fill(127);
    //     }
    //   } else {
    //     fill(200);
    //   }
    //   rect(x, 0, w - 1, height - 1);
    // }
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
    // grassField();

    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    kore.update();
    kore.show();
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

// function mouseReleased() {
//   osc.fade(0, 0.5);
// }

function mousePressed() { //adds new branches every time the mouse is pressed
  console.log("PRESSED");
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
}
