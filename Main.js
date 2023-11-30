let bgImg;
let titleText = "Can You Survive?";
let button1, button2, button3;
let snowflakes = [];
let cursorTrail = [];
let bgm;
let checkEffect;

function preload() {
  bgImg = loadImage("Main.jpeg");
  bgm = loadSound("BgMain.mp3");
  bgm.rate(1.0);
}
function setup() {
  createCanvas(1795, 960);
  

  // Display the title
  textSize(48);
  fill(255);
  textAlign(CENTER, CENTER);
  text(titleText, width / 2, height / 4);

  // Create buttons
  const buttonWidth = 200;
  const buttonHeight = 60;

  button1 = createButton("Light Repair");
  button2 = createButton("Outlast");
  button3 = createButton("Rocket Blaster"); // This is the "Escape" button

  // Center the buttons horizontally with equal spacing
  const totalButtonWidth = 3 * buttonWidth;
  const buttonSpacing = (width - totalButtonWidth) / 4;

  button1.position(buttonSpacing, height - 100); // Adjust the vertical position as needed
  button2.position(buttonSpacing * 2 + buttonWidth, height - 100); // Adjust the vertical position as needed
  button3.position(buttonSpacing * 3 + buttonWidth * 2, height - 100); // Adjust the vertical position as needed

  // Add button event listeners
  button1.mousePressed(lightRepair);
  button2.mousePressed(outlast);
  button3.mousePressed(escape);

  // Custom styling for the buttons
  const buttonStyle = "background-color: #007BFF; color: #FFF; border: 4px solid #000; border-radius: 5px; font-size: 18px; cursor: pointer;"; // Increased border width
  button1.style(buttonStyle);
  button2.style(buttonStyle);
  button3.style(buttonStyle);

  // Set the dimensions for the buttons
  button1.size(buttonWidth, buttonHeight);
  button2.size(buttonWidth, buttonHeight);
  button3.size(buttonWidth, buttonHeight);

  // Add a CSS class for button hover effect
  button1.addClass('hover-button');
  button2.addClass('hover-button');
  button3.addClass('hover-button');
}

function draw() {
  background(bgImg);
  // Create new snowflakes
  let snowflake = {
    x: random(width),
    y: 0,
    size: random(5, 15),
    speed: random(1, 5)
  };
  snowflakes.push(snowflake);

  // Draw and update existing snowflakes
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    let flake = snowflakes[i];
    ellipse(flake.x, flake.y, flake.size, flake.size);

    flake.y += flake.speed;

    // Remove snowflakes when they go off-screen
    if (flake.y > height) {
      snowflakes.splice(i, 1);
    }
  }
  bgm.play();
  bgm.setVolume(0.2);

}

function mousePressed() {

}

function mouseMoved() {
  // Record cursor position for the trail effect
  cursorTrail.push({ x: mouseX, y: mouseY });

  // Limit the trail length
  if (cursorTrail.length > 50) {
    cursorTrail.shift();
  }
}

function lightRepair() {
  // Add your logic for "Light Repair" button here
  console.log("Light Repair button clicked");
  animateButton(button1);
  window.location.href = "Game1.html";
}

function outlast() {
  // Add your logic for "Outlast" button here
  console.log("Outlast button clicked");
  animateButton(button2);
  window.location.href = "Outlast.html";
}

function escape() {
  // Add your logic for "Escape" button here
  animateButton(button3);
  window.location.href = "index.html";
}

function animateButton(button) {
  // Change the button color temporarily when clicked
  button.style("background-color", "#00FF00"); // Change to green
  setTimeout(() => {
    button.style("background-color", "#007BFF"); // Revert to the original color
  }, 500); // Revert back to the original color after 500ms
}
