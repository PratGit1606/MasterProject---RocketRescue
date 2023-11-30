let button1;
let screen = 0;
let y = -20;
let x = 200;
let speed = 8;
let score = 0;
let lives = 3;
let ballImage;
let boxImage;
let bgm;
let screenStarted = false;
let gameStarted = false;
let startButton = {
  x: 900,
  y: 690,
  w: 200,
  h: 60,
};
function preload() {
  bg = loadImage("Game2.png");
  paddleImage = loadImage("UFO.png");
  ballImage = loadImage("Alien.png");
  //bgm = loadSound("OutlastChase.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  //background(bg);
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    endScreen();
  }
}
function homeButton(){
  button1 = createButton("Back to Home Page");
  button1.position(80, 80);
  button1.style('background-color', 'maroon');
  button1.style('color', 'white');
  button1.style('font-family', 'Arial, sans-serif');
  button1.style('font-size', '30px');
  button1.mouseOver(changeColor);
  button1.mouseOut(resetColor);
  button1.mousePressed(backToHome);
}
function startGame() {
  startDrawing = true;
}
function backToHome() {
  window.location.href = "Main.html";
}
function changeColor() {
  button1.style('background-color', 'blue');
}

function resetColor() {
  button1.style('background-color', 'maroon');
}

function startScreen() {
  if (screenStarted == false) {
    homeButton();
    background(bg);
    fill(255);
    textAlign(CENTER);
    textSize(90);
    text('OUTLAST', width / 2, height / 2 - 140);
    textSize(30);
    text("Instructions:\n1) Click on the button below to start the game\n2) The game is a simple catch the ball game, catch the ball into the box before it touches the ground\n3) You have 3 lives\n4) Here's the twist... with each catch, the ball becomes faster", width / 2, height / 2 - 40)

    // Draw the start button
    rectMode(CENTER);
    fill(0, 0, 0);
    rect(startButton.x, startButton.y, startButton.w, startButton.h, 10);
    fill(255);
    textSize(28);
    text('Click to Start', startButton.x, startButton.y);

    if (
      mouseX > startButton.x - startButton.w / 2 &&
      mouseX < startButton.x + startButton.w / 2 &&
      mouseY > startButton.y - startButton.h / 2 &&
      mouseY < startButton.y + startButton.h / 2
    ) {
      // Highlight the button if the mouse is over it
      fill(0, 150, 0);
      rect(startButton.x, startButton.y, startButton.w, startButton.h, 10);
      fill(255);
      textSize(28);
      text('Click to Start', startButton.x, startButton.y);
    }
  }
  screenStarted = true;
  if (mouseIsPressed) {
    screen = 1; // Start the game
    resetGame();
  }
}

function gameOn() {
  homeButton();
  background(255);
  ///bgm.play(); bgm.setVolume(0.1); bgm.rate(0.1);
  // Draw the score and lives at the top right corner of the canvas
  image(bg, 0, 0, windowWidth * 2, windowHeight * 2);
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Score: " + score, width - 20, 30);
  text("Lives: " + lives, width - 20, 60);
  fill(255, 255, 255);
  imageMode(CENTER);
  image(ballImage, x, y, 200, 200);
  //rectMode(CENTER);
  //rect(mouseX, height - 10, 300, 100);
  image(paddleImage, mouseX, height - 10, 300, 100);
  y += speed;

  if (y > height) {
    lives--;
    if (lives <= 0) {
      screen = 2;
    } else {
      y = -20;
      pickRandom();
    }
  }

  if (y > height - 10 && x > mouseX - 20 && x < mouseX + 20) {
    y = -20;
    speed += 1.5;
    score += 1;
  }

  if (y == -20) {
    pickRandom();
  }
}

function pickRandom() {
  x = random(20, width - 20);
}

function endScreen() {
  homeButton();
  background(255);
  image(bg, 0, 0, windowWidth * 2, windowHeight * 2);
  textAlign(CENTER);
  textSize(64);
  text('GAME OVER', width / 2, height / 2);
  textSize(24);
  text("SCORE = " + score, width / 2, height / 2 + 40);
  textSize(28);
  text('Click to play again', width / 2, height / 2 + 80);

  if (mouseIsPressed) {
    screen = 0;
    resetGame();
  }
}

function resetGame() {
  score = 0;
  speed = 5;
  y = -20;
  pickRandom();
  lives = 3;
}