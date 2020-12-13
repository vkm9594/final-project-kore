var screen = 0;
var fadeIn = 0;
var fadeOut = 255;
let bgMusic;
let treeGrowSound;
let treeDoneSound;
let stars = [];
let grass = [];
var yoff = 0.0;
let root;
let tree = [];
let flowers = [];
let kore;
let sprite;
let boat;
let soundClassifier;
var count = 0;

function preload() {
  soundFormats('ogg', 'mp3');
  bgMusic = loadSound("sounds/background-music.mp3");
  treeGrowSound = loadSound("sounds/tree-growing.mp3");
  treeDoneSound = loadSound("sounds/tree-grown.mp3");
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
  textFont("megrim");

  for (let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }
  kore = new Character();
  soundClassifier.classify(gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log('ERROR');
  }
  if (results[0].label === 'go') {
    var a = createVector(width / 2, height);
    var b = createVector(width / 2, height - 200);
    root = new Branch(a, b);
    tree[0] = root;
    console.log(results[0].label, results[0].confidence)
  } 
  if (results[0].label === 'down') {
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].y += random(0, 3);
      console.log(results[0].label, results[0].confidence);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(142, 188, 113);
  if (screen == 0) {
    textSize(150);
    fill(255, 255, 255, fadeIn);
    fadeIn++;
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

    fill(208, 242, 217, fadeIn);
    fadeIn += 0.5;
    text("Lost at sea with no trees", 50, height / 2);

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

    kore.update();
    kore.show();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    screen = 1;
    bgMusic.setVolume(0.1);
    bgMusic.play();
    bgMusic.loop();
  }
}

function mousePressed() { //adds new branches every time the mouse is pressed
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
      //console.log(tree[i]);
    }
    tree[i].finished = true;
    treeGrowSound.setVolume(0.3);
    treeGrowSound.playMode('restart');
    treeGrowSound.play();
  }
  count++;

  if (count === 8) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let flower = tree[i].end.copy();
        flowers.push(flower);
      }
    }
    treeDoneSound.setVolume(0.3);
    treeDoneSound.play();
  }
}