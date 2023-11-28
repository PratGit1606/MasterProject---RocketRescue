let button1;
function preload() {
    bg = loadImage("Game3.jpg");
}
function setup() {
    createCanvas(1795, 960);
}
function draw() {
    background(bg);
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
function backToHome(){
    window.location.href = "Main.html";
}
function changeColor() {
    button1.style('background-color', 'blue');
}
  
function resetColor() {
    button1.style('background-color', 'maroon');
}