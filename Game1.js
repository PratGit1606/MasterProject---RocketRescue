let circles = [];
let box;
let playAgainMessage = false;
let timeLimit = 40 * 1000; // Initial time limit set to 40 seconds (in milliseconds)
let startTime;
let screen = 0;
let circlesInBox = 0;
let totalCollected = 0; // Counter for how many circles the user has collected
const circlesToChangeBox = 3;
let bg;
let bolt;
let power_box1;
let power_box2;
let startButton = {
  x: 900,
  y: 820,
  w: 200,
  h: 60,
};
let playAgainButton = {
  x: 900,
  y: 820,
  w: 200,
  h: 40,
};

function setup() {
  createCanvas(1795, 960);
  resetCircles();
  box = createBox();
  bg = loadImage("Game1BG.jpeg");
  bolt = loadImage("Bolt.png");
  power_box1 = loadImage("Battery1.png");
  power_box2 = loadImage("Battery2.png");
}

function draw() {
  if (screen == 0) {
    startGame();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    tryAgainScreen();
  }
}

function backToHome() {
  window.location.href = "Main.html";
}

function startGame() {
  background(bg);
  homeButton();
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text('LIGHT\nREPAIR', width / 2, height / 2 + 5);
  textSize(25);
  text("Instructions:\n1) Click on the button below to start the game\n2) The game is a drag the ball to the box game\ndrag the ball into the box before the time runs out\n3) You have 3 lives\n4) Here's the twist... with each level cleared, the time lessens", width / 2, height / 2 + 120);

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
    fill(0, 150, 0);
    rect(startButton.x, startButton.y, startButton.w, startButton.h, 10);
    fill(255);
    textSize(28);
    text('Click to Start', startButton.x, startButton.y);
    if (mouseIsPressed) {
      screen = 1;
      resetCircles();
      resetTimer();
    }
  }
}

function gameOn() {
  background(bg);
  box.display();
  homeButton();
  // Display and update each circle
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].update();
  }

  // Display total collected
  fill(255);
  textAlign(LEFT);
  textSize(30);
  text(`Collected: ${totalCollected}`, width/2-90, 140);

  // Display timer
  fill(255);
  textAlign(RIGHT);
  textSize(30);
  let remainingTime = Math.max(0, Math.ceil((timeLimit - (millis() - startTime)) / 1000));
  text(`Time: ${remainingTime}`, width/2 + 43 , 170);

  // Check if all circles are in the box
  if (circles.every(circle => circle.inBox)) {
    // Reset the circles and box
    circlesInBox++;
    totalCollected++;
    resetCircles();
    box.reset();

    // Change box location and decrease time after all circles are placed
    if (circlesInBox > 0 && circlesInBox % circlesToChangeBox === 0) {
      box.changeLocation();
      decreaseTimeLimit();
    }
  }

  // Check if time has run out or user failed
  if (remainingTime === 0 || playAgainMessage) {
    playAgainMessage = true;
    screen = 2;
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
function backToHome() {
  window.location.href = "Main.html";
}
function changeColor() {
  button1.style('background-color', 'blue');
}

function resetColor() {
  button1.style('background-color', 'maroon');
}
function tryAgainScreen() {
  homeButton();
  background(200);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(`Time's up!\nYou COLLECTED ${totalCollected} POWER!\nClick to play again`, width / 2, height / 2);

  fill(0, 0, 0);
  rect(playAgainButton.x, playAgainButton.y, playAgainButton.w, playAgainButton.h, 10);
  fill(255);
  textSize(20);
  text('Click to Play Again', playAgainButton.x, playAgainButton.y);

  if (
    mouseX > playAgainButton.x - playAgainButton.w / 2 &&
    mouseX < playAgainButton.x + playAgainButton.w / 2 &&
    mouseY > playAgainButton.y - playAgainButton.h / 2 &&
    mouseY < playAgainButton.y + playAgainButton.h / 2
  ) {
    fill(0, 150, 0);
    rect(playAgainButton.x, playAgainButton.y, playAgainButton.w, playAgainButton.h, 10);
    fill(255);
    textSize(20);
    text('Click to Play Again', playAgainButton.x, playAgainButton.y);
    totalCollected = 0;
    if (mouseIsPressed) {
      screen = 0;
      resetCircles();
      resetTimer();
    }
  }
}

function createBox() {
  return {
    x: random(width - 120),
    y: random(height - 120),
    width: 120,
    height: 120,
    display: function () {
      image(power_box1,this.x, this.y, this.width-40, this.height);
    },
    reset: function () {
      this.x = random(width - 120);
      this.y = random(height - 120);
    },
    changeLocation: function () {
      this.reset();
      circlesInBox = 0;
    }
  };
}

function createCircle(x, y) {
  return {
    x: x,
    y: y,
    radius: 50,
    inBox: false,
    dragging: false,
    display: function () {
      image(bolt, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    },
    update: function () {
      if (this.dragging) {
        this.x = mouseX;
        this.y = mouseY;
      }

      if (!this.inBox) {
        if (this.x > box.x && this.x < box.x + box.width && this.y > box.y && this.y < box.y + box.height) {
          this.inBox = true;
          this.x = box.x + box.width / 2;
          this.y = box.y + box.height / 2;
          this.dragging = false;
        }
      }
    },
    reset: function () {
      this.inBox = false;
      this.dragging = false;
    }
  };
}

function resetCircles() {
  circles = [];
  for (let i = 0; i < 7; i++) {
    circles.push(createCircle(random(width), random(height)));
  }
  playAgainMessage = false;
}

function resetTimer() {
  timeLimit = 40 * 1000; // Reset the timer to 40 seconds (in milliseconds)
  startTime = millis();
}

function decreaseTimeLimit() {
  timeLimit /= 2; // Decrease the time limit by half
}

function mousePressed() {
  if (playAgainMessage) {
    resetCircles();
    box.reset();
    resetTimer();
    screen = 0;
  } else {
    for (let i = 0; i < circles.length; i++) {
      if (dist(mouseX, mouseY, circles[i].x, circles[i].y) < circles[i].radius) {
        circles[i].dragging = true;
      }
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].dragging = false;
  }
}
