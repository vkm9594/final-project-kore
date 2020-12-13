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
let addCharacter;
let kore;
let boat;
let soundClassifier;
var count = 0;
let plants = [];

function preload() {
  soundFormats('ogg', 'mp3');
  for (i = 0; i < 2; i++) {
    plants[i] = loadImage("images/plant" + i + ".gif");
  }
  bgMusic = loadSound("sounds/background-music.mp3");
  treeGrowSound = loadSound("sounds/tree-growing.mp3");
  treeDoneSound = loadSound("sounds/tree-grown.mp3");
  const options = {
    probabilityThreshold: 0.9
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, setup);
  kore = loadImage("images/kore.gif");
  boat = loadImage("images/boat.png");
  screen = 0;
}

function setup() {
  screen = 0;
  createCanvas(windowWidth - 2, windowHeight - 3);
  textFont("megrim");

  // var a = createVector(width / 2, height);
  // var b = createVector(width / 2, height - 200);
  // root = new Branch(a, b);
  // tree[0] = root;

  for (let i = 0; i < 500; i++) {
    stars[i] = new Star();
  }
  addCharacter = new Character();
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
    fill(240, 255, 244, fadeIn);
    fadeIn += 10;
    text("[Click the canvas until the tree is fully grown]", 100, height / 2 + 50);
    console.log(results[0].label, results[0].confidence)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function titleScreen() {
  push();
  scale(0.8);
  image(plants[0], 0, 100);
  scale(1);
  image(plants[1], width - 100, height - 200);
  pop();
  textSize(150);
  noStroke();
  fill(255, 255, 255, fadeIn);
  fadeIn++;
  text("Kore", width / 2 - 180, height / 2);
  textSize(24);
  text("Press enter to begin", width / 2 - 135, height / 2 + 50);
}

function instructionScreen() {
  textSize(24);
  fill(255, 255, 255, fadeIn);
  fadeIn++;
  text("Instructions will be given in [brackets]", width / 2 - 200, height / 2 - 30);
  text("Please make sure your microphone is on for this", width / 2 - 250, height / 2);
  text("[press shift] and enjoy :)", width / 2 - 135, height / 2 + 60);
}

function draw() {
  background(102);
  if (screen == 0) {
    titleScreen();
  }

  if (screen == 1) {
    instructionScreen();
  }

  if (screen == 2) {
    startColor = color(0, 145, 212);
    stopColor = color(247, 245, 163);
    verticalGradientRect(0, 0, windowWidth, windowHeight, startColor, stopColor);
    moon();

    for (let i = 0; i < stars.length; i++) { //calls class Star in background.js
      stars[i].show();
    }

    fill(240, 255, 244, fadeIn);
    fadeIn++;
    text("Alone at sea...", 50, height / 2);

    // draws the waves
    wave1();
    wave2();
    wave3();

    for (let i = 0; i < tree.length; i++) {
      tree[i].show();
    }

    for (let i = 0; i < flowers.length; i++) {
      push();
      noStroke();
      fill(255, 158, 200, 150);
      arc(flowers[i].x + random(-2, 2), flowers[i].y, 50, 50, 5*PI / 6, 0, PIE);
      frameRate(20);
      rotate(random(0, PI));
      arc(flowers[i].x, flowers[i].y, 40, 40, 0, PI + QUARTER_PI, PIE);
      pop();
      // let dy = 0;
      // dy += random(0.25, 1.5);
      // flowers[i].y += random(10, 20) * dy;
    }

    addCharacter.move();
    addCharacter.show();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    screen = 1;
    bgMusic.setVolume(0.1);
    bgMusic.playMode('restart');
    bgMusic.play();
    bgMusic.loop();
  }
  if (keyCode === SHIFT) {
    screen = 2;
  }
}

function mousePressed() { //adds new branches every time the mouse is pressed
  if (count < 8) {
    for (let i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
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
}