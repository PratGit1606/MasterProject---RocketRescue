let Sponge, Sponge2, meteor, back, beam, player, button, spongebob, sadbob, GAMESTART;
let x = 0;
let bullets = [];
let meteors = [];
let currTime = 30;
let snowflakes = [];
let s = currTime;
let i;
let start
let myFont;
let bulletSpeed = 10;
let winScreen, vineboom, shoot, jojo, winsound, musicchase, fail
let counter = 0;
let nextbutton, playbutton, retrybutton
let interval = 60;
let lastColorChange = 0;
let pausemusic = false;
let over = false;
let bulletFired = false;
let mainmenubutton


function preload() {
  
  vineboom = loadSound("vineboom.mp3")
  shoot = loadSound("shoot.mp3")
  jojo = loadSound("videogamelobby.mp3")
  winsound = loadSound("winsound.mp3")
  musicchase = loadSound("MusicChase.mp3")
  fail = loadSound("fal.mp3")
  
  myFont = loadFont("KrabbyPatty-PKZAB.ttf");
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block'); 
  rocket = loadImage('rocket.png');
  Sponge2 = loadImage('Sponde.jpg');
  meteor = loadImage('meteorgif.gif');
  back = loadImage('background.jpg');
  beam = loadImage('beam.png');
  spongebob = loadImage('spongebob.png');
  GAMESTART = loadImage('Space-Background-Image-3.jpg');
  sadbob = loadImage('sadbob.jpg');
  winScreen = loadImage('happysponge.gif');
  
  myFont = loadFont("KrabbyPatty-PKZAB.ttf");
  
  frameRate(60);
  

  
  
}


function newTime() {
  
  if (counter == 1) {
  currTime = 35
  level2_k()
  } else if (counter == 2) {
    currTime = 40
  level3_k()
  }
  
  loop()
}

function startstuff() {
  

  if (nextbutton) {
    nextbutton.remove()
  }
  
  if (counter == 1) {
  currTime = 36
  s = currTime
  image(back, 0, 0, width, height)
  playbutton = createButton('START');
  playbutton.position(width / 2 - 50, height / 2);
  playbutton.size(100, 40)
  playbutton.mousePressed(newTime);
    
    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(255, 0, 0)
    text("LEVEL 2", width/2, 30)
    text("FASTER!", width/2, 100)
  
    
  start = true
  counter++
  } else if (counter == 2) {
  currTime = 41
  s = currTime
  image(back, 0, 0, width, height)
  playbutton = createButton('START');
  playbutton.position(width / 2 - 50, height / 2);
  playbutton.size(100, 40)
  playbutton.mousePressed(newTime);
    
    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(255, 0, 0)
    text("LEVEL 3", width/2, 30)
    text("EVEN FASTER!!", width/2, 100)
  
  start = true
  counter++
  }
  
}

//next button
function nextLevel1() {
  if (counter == 1 || counter == 2) {
  nextbutton = createButton("NEXT LEVEL");
  nextbutton.position(width / 2 - 50, height - 100);
  nextbutton.size(100, 40)
  nextbutton.mousePressed(startstuff);
  } else if (counter == 3) {
  mainMenuButton = createButton("PLAY AGAIN");
  mainMenuButton.position(width / 2 - 50, height/2);
  mainMenuButton.size(100, 40)
  mainMenuButton.mousePressed(() => {
    window.location.reload();
});

    
    
     counter = 0
     start = false;
    s = 31
    
  }
  
}




//starting screen
function startScreen() {
  homeButton();
  if (start != true && counter == 0) {
    
    if (jojo.isPlaying() == false){
    jojo.play();
      jojo.setVolume(0.7)
      
    }
    
    image(GAMESTART, 0, 0, width, height);
    textSize(100);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(100, 255, 100)
    text("ROCKET BLASTER", width/2, height/2)
    fill(0,200,255)
    stroke(30, 30, 30)
    rect(recx = width/3, recy = 390, 500, 50, 10)
    //fill(253, 215, 100);
      
    if ((frameCount - lastColorChange) % interval < interval / 2 && s == 31) {
    push();
    fill(230, 190, 90);
    stroke(5);
    textAlign(CENTER, BOTTOM);
    textSize(30);
    text("CLICK TO START", width / 2, height/2);
    pop();
    } else {
      push()
    fill(253, 215, 100);
      stroke(5);
      textAlign(CENTER, BOTTOM)
      textSize(30)
      text("CLICK TO START",width/2, 435);
    pop()
      
    }
      if (frameCount - lastColorChange >= interval) {
    lastColorChange = frameCount;
  }

     

  
    if (mouseX <= recx+500 && 
        mouseX >= recx && 
        mouseY >= recy &&
        mouseY <= recy + 50 &&
        mouseIsPressed == true) {
      counter++
      s--
      start = true;
      }
  }
      
}

function startScreen2() {
  loop()
  clear()
  start = false
  counter = 0
  musicchase.pause()
  
  
  if(mainmenubutton) {
    mainmenubutton.remove()
  }
  
  if (start != true && counter == 0) {
    loop()
    
    if (jojo.isPlaying() == false){
    jojo.play();
      jojo.setVolume(0.7)
      
    } 
    
    image(GAMESTART, 0, 0, width, height);
    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(100, 255, 100)
    text("METEORS", width/2, 30)
    fill(0,200,255)
    stroke(30, 30, 30)
    rect(recx = width/3, recy = 390, 250, 50, 10)
    //fill(253, 215, 100);
      
    if ((frameCount - lastColorChange) % interval < interval / 2 && s == 31) {
    push();
    fill(230, 190, 90);
    stroke(5);
    textAlign(CENTER, BOTTOM);
    textSize(30);
    text("CLICK TO START", width / 2, 435);
    pop();
    } else {
      push()
    fill(253, 215, 100);
      stroke(5);
      textAlign(CENTER, BOTTOM)
      textSize(30)
      text("CLICK TO START",width/2, height/2);
    pop()
      
    }
      if (frameCount - lastColorChange >= interval) {
    lastColorChange = frameCount;
  }

     
    image(meteor, 200, 2, 100, 100)
    image(meteor, 465, 2, 100, 100)
  
    if (mouseX <= recx+500 && 
        mouseX >= recx && 
        mouseY >= recy &&
        mouseY <= recy + 50 &&
        mouseIsPressed == true) {
      counter++
      s--
      start = true;
      }
  }
      
}

//game over screen
function gameOver() {
  pausemusic = true;
  
  if (fail.isPlaying() == false) {
    fail.play();
    fail.setVolume(0.05)
    noLoop()
  }
  
  if (retrybutton) {
    retrybutton.remove();
    retrybutton = null; // Set retrybutton to null after removing it
  }
  
  if (!retrybutton) {
  retrybutton = createButton("RETRY?");
    retrybutton.position(width / 2 - 50, height - 100);
    retrybutton.size(100, 40)
    retrybutton.mousePressed(level1_k);
  } 
  
  image(sadbob, 0, 0, width, height);
  textStyle(BOLD);
  stroke(2)
  textSize(60);
  textFont(myFont);
  textAlign(CENTER, RIGHT)
  fill(255, 0, 0)
  text("GAME OVER", width/2, 300);
  //noLoop()
}

//retry level
function redo() {
  if(retrybutton) {
    retrybutton.remove()
    retrybutton = null;
  }
  loop()
  if (musicchase.isPlaying() == true) {
    fail.stop()
  }
  pausemusic = false
    over = false
  if (retrybutton) {
    retrybutton.remove()
  }
  
  if (counter == 1) {
  currTime = 30
  s = currTime
  image(back, 0, 0, width, height)
   
  start = true
    
  } else if (counter == 2) {
  currTime = 35
  s = currTime
  image(back, 0, 0, width, height)
   
  start = true
  } else if (counter == 3) {
  currTime = 40
  s = currTime
  image(back, 0, 0, width, height)
   
  start = true
  }
  
}


function youWin() {
  if (winsound.isPlaying() == false) {
    winsound.play();
    winsound.setVolume(0.2)
    noLoop()
  }
  
  image(winScreen, 0, 0, width, height);
  textStyle(BOLD);
  stroke(2)
  textSize(60);
  textFont(myFont);
  textAlign(CENTER, RIGHT)
  text("YOU WIN", width/2, 80);
  
}

function homeButton(){
  button1 = createButton("Back to Home Page");
  button1.position(1450, 50);
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

function gameTimer() {
  // Timer
  if (start == true) {
    textSize(32);
    fill(189, 0, 0);
    noStroke();
    textSize(40);
    textFont('Courier New');
    textAlign(TOP, RIGHT);
    text('Time: ' + s, 130, 85);

    if (frameCount % 60 == 0 && s > 0 && over == false) {
      s--;
    }
  }
}



//level 1

function level1_k() {
  
  homeButton();
  if (musicchase.isPlaying() == false){
    musicchase.play();
    musicchase.setVolume(0.2)
    
    if(musicchase.isPlaying() == true) {
        jojo.stop()
      }
  }
  if(s <= 1 || pausemusic==true) {
    musicchase.stop();
    //noLoop()
    //noLoop()
    }

  if (s == 31) {
    startScreen();
  } else if(s <= 30 && s > 0){
    
    background(220);
    image(back, 0, 0, width, height);

    // Create new meteors randomly
    if (frameCount % 120 == 0 && s > 0 && s <= 30 && (start == true)) {
      meteors.push({ x: random(50, width - 100), y: 0 });
    }
    
  //bullets  
    if (s > 0 && s < currTime && mouseIsPressed && !bulletFired) {
      let bullet = {
      x: mouseX - 10,
      y: height - 130
    };
      bullets.push(bullet);

      bulletFired = true;
    }

    if (!mouseIsPressed) {
    bulletFired = false;
    }

    
    //pause music 
    
    // Update and display meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      let meteor1 = meteors[i];
      image(meteor, meteor1.x, meteor1.y, 100, 100);
      meteor1.y += 3.5; // Make meteors fall
      
      //gameOver screen when meteors hit ground
      if (meteor1.y + 100 > height) {
        meteors.splice(0, meteors.length);
        bullets.splice(0, bullets.length);
        gameOver();
        start = false;
        musicchase.stop()
        over = true;
        
      }
      
      //Win when time is up
      if (s == 0) {
        meteors.splice(0, meteors.length);
        youWin();
         
      }

      // Check for collisions with bullets
      for (let j = bullets.length - 1; j >= 0; j--) {
        let bullet = bullets[j];
        if (
          bullet.x + 30 > meteor1.x &&
          bullet.x < meteor1.x + 100 &&
          bullet.y + 30 > meteor1.y &&
          bullet.y < meteor1.y + 100
        ) {
          // Collision detected, remove bullet and meteor
          bullets.splice(j, 1);
          meteors.splice(i, 1);
          
          //vineboom.play()
          shoot.play()
          shoot.setVolume(0.7)
        }
        
        
      }
    }
    
    let counter = 0;

    // Display bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      image(beam, bullet.x-42, bullet.y, 80, 280);
      bullet.y -= bulletSpeed;

      if (bullet.y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Display player
    player = image(rocket, mouseX - 50, height - 120, 80, 100);

    gameTimer();

    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(100, 255, 100)
    text("LEVEL 1", width/2, 30)

  }
}

//level 2
function level2_k() {
  homeButton();
  if (musicchase.isPlaying() == false){
    musicchase.play()
    musicchase.playMode('restart');
    musicchase.setVolume(0.2)
    
  }
  if(s <= 1) {
    musicchase.stop();
    //noLoop()
    //noLoop()
    }
  
  if (s == 35) {
    meteors.splice(0, meteors.length);
    bullets.splice(0, bullets.length);
  }
   //currTime == 45
  if(playbutton) {
    playbutton.remove()
  }
    
    background(220);
    image(back, 0, 0, width, height);

    // Create new meteors randomly
    if (frameCount % 60 == 0 && s > 0 && s <= 35) {
      meteors.push({ x: random(50, width - 100), y: 0 });
    }
  //bullets  
    if (s > 0 && s < currTime && mouseIsPressed && !bulletFired) {
      let bullet = {
      x: mouseX - 10,
      y: height - 130
    };
      bullets.push(bullet);

      bulletFired = true;
    }

    if (!mouseIsPressed) {
    bulletFired = false;
    }
    
    // Update and display meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      let meteor1 = meteors[i];
      image(meteor, meteor1.x, meteor1.y, 100, 100);
      meteor1.y += 4.5; // Make meteors fall
      
      //gameOver screen when meteors hit ground
      if (meteor1.y + 100 > height) {
        meteors.splice(0, meteors.length);
        bullets.splice(0, bullets.length);
        gameOver();
        start = false;
        musicchase.stop()
        over = true;
        
      }
      
      //Win when time is up
      if (s == 0) {
        meteors.splice(0, meteors.length);
        youWin();
        
      }

      // Check for collisions with bullets
      for (let j = bullets.length - 1; j >= 0; j--) {
        let bullet = bullets[j];
        if (
          bullet.x + 30 > meteor1.x &&
          bullet.x < meteor1.x + 100 &&
          bullet.y + 30 > meteor1.y &&
          bullet.y < meteor1.y + 100
        ) {
          // Collision detected, remove bullet and meteor
          bullets.splice(j, 1);
          meteors.splice(i, 1);
          
          //vineboom.play()
          shoot.play()
          shoot.setVolume(0.5)
        }
        
        
      }
    }

    // Display bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      image(beam, bullet.x-42, bullet.y, 80, 280);
      bullet.y -= bulletSpeed;

      if (bullet.y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Display player
    player = image(rocket, mouseX - 50, height - 120, 80, 100);

    gameTimer();

    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(100, 255, 100)
    text("LEVEL 2", width/2, 30)

}

//level 3
function level3_k() {
  homeButton();
  if (musicchase.isPlaying() == false){
    musicchase.play()
    musicchase.playMode('restart');
    musicchase.setVolume(0.2)
    
  }
  if(s <= 1) {
    musicchase.stop();
    //noLoop()
    //noLoop()
    }
  
  if (s == 41) {
    meteors.splice(0, meteors.length);
    bullets.splice(0, bullets.length);
  }
  
  if (s == 1) {
        meteors.splice(0, meteors.length);
        bullets.splice(0, bullets.length);
        
      }

  if(playbutton) {
    playbutton.remove()
  }
    
    background(220);
    image(back, 0, 0, width, height);

    // Create new meteors randomly
    if (frameCount % 30 == 0 && s > 0 && s <= 40) {
      meteors.push({ x: random(50, width - 100), y: 0 });
    }
  
  //bullets  
    if (s > 0 && s < currTime && mouseIsPressed && !bulletFired) {
      let bullet = {
      x: mouseX - 10,
      y: height - 130
    };
      bullets.push(bullet);

      bulletFired = true;
    }

    if (!mouseIsPressed) {
    bulletFired = false;
    }
    
    // Update and display meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      let meteor1 = meteors[i];
      image(meteor, meteor1.x, meteor1.y, 100, 100);
      meteor1.y += 5.5; // Make meteors fall
      
      //gameOver screen when meteors hit ground
      if (meteor1.y + 100 > height) {
        meteors.splice(0, meteors.length);
        bullets.splice(0, bullets.length);
        gameOver();
        start = false;
        musicchase.stop()
        over = true;
        
      }
      
      //Win when time is up
      if (s == 0) {
        meteors.splice(0, meteors.length);
        youWin();
        
      }

      // Check for collisions with bullets
      for (let j = bullets.length - 1; j >= 0; j--) {
        let bullet = bullets[j];
        if (
          bullet.x + 30 > meteor1.x &&
          bullet.x < meteor1.x + 100 &&
          bullet.y + 30 > meteor1.y &&
          bullet.y < meteor1.y + 100
        ) {
          // Collision detected, remove bullet and meteor
          bullets.splice(j, 1);
          meteors.splice(i, 1);
          
          //vineboom.play()
          shoot.play()
          shoot.setVolume(0.5)
        }
        
        
      }
    }

    // Display bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      image(beam, bullet.x-42, bullet.y, 80, 280);
      bullet.y -= bulletSpeed;

      if (bullet.y < 0) {
        bullets.splice(i, 1);
      }
    }

    // Display player
    player = image(rocket, mouseX - 50, height - 120, 80, 100);

    gameTimer();

    textSize(50);
    textFont(myFont);
    textAlign(CENTER, TOP)
    fill(100, 255, 100)
    text("LEVEL 3", width/2, 30)

}

function draw() {
  clear()
  if (counter == 0) {
    startScreen()
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
      fill(random(255), random(255), random(255));
      ellipse(flake.x, flake.y, flake.size, flake.size);
  
      flake.y += flake.speed;
  
      // Remove snowflakes when they go off-screen
      if (flake.y > height) {
        snowflakes.splice(i, 1);
      }
    }
  } else if (counter == 1) {
    level1_k() 
  } else if (counter == 2) {
    level2_k()
  } else if (counter ==3) {
    level3_k() 
  }
  if (s == 0) {
    youWin()
    nextLevel1()
    start = false;
  }
  if (over == true) {
    gameOver()
  }

  
}
