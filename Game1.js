let circles = [];
let box;
let playAgainMessage = false;
let timeLimit = 10;
let startTime;
let screen = 0;
let circlesInBox = 0;
let button1;
const circlesToChangeBox = 3;
let bg;
let startButton = {
  x: 900,
  y: 820,
  w: 200,
  h: 60,
};


function setup() {
  createCanvas(1795, 960);
  box = createBox();
  resetCircles();
  bg = loadImage("Game1BG.jpeg");

}

function draw() {
  if (screen == 0){
    startGame();
  }
  else if (screen == 1){
    gameOn();
  }
}
function backToHome(){
  window.location.href = "Main.html";
}
function startGame() {
  background(bg);
  fill((255, 255, 255))
  textAlign(CENTER);
  textSize(60);
  text('LIGHT\nREPAIR', width / 2, height / 2 + 5);
  textSize(25);
  text("Instructions:\n1) Click on the button below to start the game\n2) The game is a drag the ball to the box game\ndrag the ball into the box before the time runs out\n3) You have 3 lives\n4) Here's the twist... with each level cleared, the time lessens", width / 2, height / 2 + 120)

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
    if (mouseIsPressed) {
      screen = 1; // Start the game
      resetGame();
    }
  }

}
function gameOn() {
  background(bg);
  box.display();

  // Display and update each circle
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].update();
  }

  // Check if all circles are in the box
  if (circles.every(circle => circle.inBox)) {
    // Reset the circles and box
    circlesInBox++;
    resetCircles();
    box.reset();

    // Display "Click to play again" message
    if (timeLimit > 0) {
      timeLimit--;
    } else {
      playAgainMessage = true;
    }
    startTime = millis();
  }

  // Check if time has run out or user failed
  if (timeLimit === 0 || playAgainMessage) {
    playAgainMessage = true;
  }

  // Check if it's time to change the box's location
  if (circlesInBox > 0 && circlesInBox % circlesToChangeBox === 0) {
    box.changeLocation();
  }

  // Display "Click to play again" message
  if (playAgainMessage) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Click to play again", width / 2, height - 20);
  }
}


function createBox() {
  return {
    x: random(width - 120),
    y: random(height - 120),
    width: 120,
    height: 120,
    display: function () {
      fill(200);
      stroke(0);
      rect(this.x, this.y, this.width, this.height);
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
    radius: 20,
    inBox: false,
    dragging: false,
    display: function () {
      fill(150);
      stroke(0);
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    },
    update: function () {
      if (this.dragging) {
        this.x = mouseX;
        this.y = mouseY;
      }

      if (!this.inBox) {
        // Check if the circle is dragged into the box
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
  timeLimit = 10;
  startTime = millis();
}

function mousePressed() {
  // Check if "Click to play again" message is displayed
  if (playAgainMessage) {
    // Reset the game if clicked
    resetCircles();
    box.reset();
  } else {
    // Check if a circle is clicked
    for (let i = 0; i < circles.length; i++) {
      if (dist(mouseX, mouseY, circles[i].x, circles[i].y) < circles[i].radius) {
        circles[i].dragging = true;
      }
    }
  }
}

function mouseReleased() {
  // Release all circles when the mouse is released
  for (let i = 0; i < circles.length; i++) {
    circles[i].dragging = false;
  }
}
