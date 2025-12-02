
let firstScript = "sketch.js";
let secondScript = "sketch2.js";
let thirdScript = "sketch3.js";
let tempRandomIndex = -1;

let gameList = [firstScript, secondScript, thirdScript];

let mainScript = document.createElement("script");
document.head.appendChild(mainScript);

let totalCount = 0;
let correctCount = 0;


// MEMORY GAME WITH FLASHING BOXES
// Uses your original 9 colors & positions exactly

let squares = [];
let colors = [];
let pattern = [];
let level = 1;
let strikes = 0;
let player = [];

let showing = true;
let showIndex = 0;
let timer = 0;

let flashTime = 40; // how long the flash lasts
let pauseTime = 25; // pause between flashes

let doOnce2 = true;

// CONNECT THE DOTS GAME VARIABLES
let x = [];
let y = [];
let radius = 20;
let circleCount = 6;
let colors1 = [];
let current = 1; 
let linesX = [];
let linesY = [];
let wrongSound; 
let correctSound;
let gameWon = false;

let doOnce1 = true;

// Button position and size
let buttonX, buttonY, buttonW, buttonH;

// EXERCISE 1 VARIABLES
let squareX = 205;
let squareY = 205;
let w = 25;
let doOnce0 = true;

//startBg = loadImage("..\menu_image\factorio_start.jpg");
//image(startBg, windowWidth, windowHeight, 0, 0);


function setup(){
  createCanvas(400, 400);
    if(tempRandomIndex == -1){
        startGame();
    }

    if(tempRandomIndex == 0){
        squareX = 205;
        squareY = 205;
        w = 25;
        rectMode(CORNER);
        resizeCanvas(400, 400);
    }
    if(tempRandomIndex == 1){
      resizeCanvas(500, 500);
    }
    if(tempRandomIndex == 2){
        resizeCanvas(460, 460);

        noStroke();
        textAlign(CENTER, CENTER);
        textSize(22);
        rectMode(CORNER);

        // YOUR ORIGINAL COLORS EXACTLY
        colors = [
            color(255, 0, 0),
            color(255, 165, 0),
            color(255, 255, 0),
            color(0, 255, 0),
            color(0, 0, 255),
            color(255, 0, 255),
            color(0, 255, 255),
            color(255, 192, 203),
            color(128, 0, 128)
        ];

        // YOUR ORIGINAL POSITIONS EXACTLY
        let xs = [50, 180, 310];
        let ys = [50, 180, 310];

        for (let y of ys) {
            for (let x of xs) {
            squares.push({ x: x, y: y });
            }
        }
    }
    
}

function preload(){
    wrongSound = loadSound('Fahh Sound Effect.mp3'); 
    wrongSound.setVolume(0.3);
  
    correctSound = loadSound('Correct Sound Effect.mp3'); 
    correctSound.setVolume(1.3);
}

function draw(){
    if(tempRandomIndex == 0){ 
        resizeCanvas(400, 400);
            let maze = [[1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,1],
                [1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1],
                [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1],
                [1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1],
                [1,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1],
                [1,0,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
                [1,0,1,0,1,1,1,1,0,0,0,0,0,0,1,1],
                [1,0,1,0,0,0,0,1,1,1,0,1,0,1,1,1],
                [1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1],
                [1,0,1,1,0,1,0,1,0,1,1,1,0,0,0,1],
                [1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1],
                [1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],]

    background(220, 220, 220);
    fill(0,0,255)
    noStroke()

    for(j = 0; j <= 15; j++){
      for(h = 0;h <= 15; h++){
        if(maze[h][j] == 1) {
          fill(0, 0, 255);
          square(j * 25, h * 25, 25);
        }
        if(maze[h][j] == 2) {
          fill(0,255, 0)
  ;        square(j * 25, h * 25, 25);
        }
      }
    }

    //noStroke();
    fill(200, 0, 0);
    square(squareX, squareY, 15);

  let gridX = Math.floor(squareX / w);
  let gridY = Math.floor(squareY / w);

    if(keyIsDown(LEFT_ARROW)){
      let nextX = Math.floor((squareX - 2) / w);
      if(maze[gridY][nextX] == 0){
        squareX -= 2;
      }
    }
    if(keyIsDown(RIGHT_ARROW)){
     let nextX = Math.floor((squareX + 2 + 15) / w);
      if(maze[gridY][nextX] == 0){
        squareX += 2;
      }
    }
    if(keyIsDown(UP_ARROW)){
      let nextY = Math.floor((squareY - 2) / w);
      if(maze[nextY][gridX] == 0){
        squareY -= 2;
      }
      else if(maze[nextY][gridX] == 2){
        //console.log("you win");
        WinScreen();

      }
    }
    if(keyIsDown(DOWN_ARROW)){
      let nextY = Math.floor((squareY + 2 + 15) / w);
      if(maze[nextY][gridX] == 0){
        squareY += 2;
      }
    }
    }
    else if(tempRandomIndex == 1){
        if(doOnce1){
            startGameEx2();
            doOnce1 = false;
        }
        if (gameWon) {
            drawWinScreen();
        }
    }
    else if(tempRandomIndex == 2){
      setup();
        if(doOnce2){
            newLevel();
            doOnce2 = false;
        }
            background(255, 255 ,255);

            // Draw boxes normally
            for (let i = 0; i < 9; i++) {
                fill(colors[i]);
                square(squares[i].x, squares[i].y, 100);
            }

            // Flash the current box in the pattern
            if (showing) {
                timer++;

                if (timer <= flashTime) {
                let idx = pattern[showIndex];
                fill(255, 255, 255);
                square(squares[idx].x, squares[idx].y, 100);
                }

                if (timer > flashTime + pauseTime) {
                timer = 0;
                showIndex++;

                if (showIndex >= pattern.length) {
                    showing = false;
                    showIndex = 0;
                    timer = 0;
                    player = [];
                }
                }
                
            }


            fill(0, 0, 0);
            text("LEVEL " + level + "    STRIKES: " + strikes, width / 2, 25);

            // WIN
            if (level > 10) {
              correctSound.stop();
              correctSound.play();
              correctCount++
                startGame();
            }

            // LOSE
            if (strikes >= 3) {
                wrongSound.stop();
                wrongSound.play();
                startGame();
            }
    }
    else if(tempRandomIndex == 3){
      FinalWinScreen();
    }
}

function startGame(){
    randomIndex = Math.floor(Math.random() * gameList.length);
    
    while(randomIndex != null && randomIndex == tempRandomIndex){
        randomIndex = Math.floor(Math.random() * gameList.length);
        console.log("changed");
    }

    tempRandomIndex = randomIndex;
    totalCount++

    if(totalCount >= 10){
      tempRandomIndex = 3;
    }

    doOnce0 = true;
    doOnce1 = true;
    doOnce2 = true;

    setup();

    /*switch(randomIndex){
        case 0:
            resizeCanvas(400, 400);
            mainScript.src = firstScript;
            break;
        case 1:
            resizeCanvas(500, 500);
            mainScript.src = secondScript;
            break;
        case 2:
            resizeCanvas(460, 460);
            mainScript.src = thirdScript;
            break;
    }*/
};

////////Execise 1 functions////////
function restart(){
  loop();
  squareX = 205;
  squareY = 205;
  
}

function nextGame(){
    loop();
    button1.remove();
    correctCount++
    startGame();
}

function WinScreen(){
  noLoop();
  correctSound.stop();
  correctSound.play();
  fill(255, 255, 255);
  square(0,0, 400);
  fill(0,0,0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You Win!", width/2, height/4);
    
  button1 = createButton('Next Game');
  button1.center();
  
  button1.mousePressed(nextGame);
  
}
/////////Exercise 2 functions////////
function startGameEx2() {
  // Reset all variables
  x = [];
  y = [];
  colors1 = [];
  linesX = [];
  linesY = [];
  current = 1;
  gameWon = false;

  // Generate non-overlapping circles
  let i = 0;
  while (i < circleCount) {
    let newX = random(radius, width - radius);
    let newY = random(radius, height - radius);
    let overlap = false;

    for (let j = 0; j < i; j++) {
      if (dist(newX, newY, x[j], y[j]) < radius * 2 + 5) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      x[i] = newX;
      y[i] = newY;
      colors1[i] = color(0, 0, 0);
      i++;
    }
  }
    drawCircles();
}

function drawCircles() {
  background(255, 255, 255);
  strokeWeight(3);
  stroke(0, 0, 255); 

  // Draw connecting lines
  for (let i = 0; i < linesX.length; i++) {
    line(linesX[i][0], linesY[i][0], linesX[i][1], linesY[i][1]);
  }

  // Draw circles and numbers
  textSize(16);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < circleCount; i++) {
    fill(colors1[i]);
    ellipse(x[i], y[i], radius * 2, radius * 2);
    fill(255, 255, 255);
    text(i + 1, x[i], y[i]);
  }
}
/*function mousePressedEx2() {
  // If on win screen, check for "Play Again" click
  if (gameWon) {
    if (
      mouseX > buttonX - buttonW / 2 &&
      mouseX < buttonX + buttonW / 2 &&
      mouseY > buttonY - buttonH / 2 &&
      mouseY < buttonY + buttonH / 2
    ) {
      nextGame(); // Make a function for this later
    }
    return;
  }

  function nextGame(){
    window.location.href = "index.html";
  }

  // Regular gameplay
  for (let i = 0; i < circleCount; i++) {
    if (dist(mouseX, mouseY, x[i], y[i]) <= radius) {
      if (i + 1 === current) {
        colors1[i] = color(0, 255, 0); 
        
        if (current > 1) {
          let lastIndex = current - 2; 
          linesX.push([x[lastIndex], x[i]]);
          linesY.push([y[lastIndex], y[i]]);
        }

        current++;
        
        if (current > circleCount) {
          correctSound.stop();
          correctSound.play();
          showWinScreen();
        }
      } else {
        colors[i] = color(255, 0, 0); 
        wrongSound.stop();
        wrongSound.play();
      }
      drawCircles();
      break;
    }
  }
}*/

function showWinScreen() {
  gameWon = true;
}

function drawWinScreen() {
  background(255, 255, 255);

  // Draw colored square
  fill(200, 255, 200);
  stroke(0, 0, 0);
  rectMode(CENTER);
  rect(width / 2, height / 2 - 30, 300, 150, 20);

  // "You Won!" text
  fill(0,0,0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("You Won!", width / 2, height / 2 - 60);

  // Play Again button (white rectangle)
  buttonX = width / 2;
  buttonY = height / 2 + 20;
  buttonW = 150;
  buttonH = 50;
  
  fill(255, 255, 255); // white background
  stroke(0,0,0);
  rect(buttonX, buttonY, buttonW, buttonH, 10);
  
  fill(0, 0, 0);
  textSize(20);
  text("Next Game", buttonX, buttonY);
}
/////////Exercise 3 functions////////
/*function mousePressedEx3() {
  if (showing) return; // can't click during flashing

  for (let i = 0; i < 9; i++) {
    let s = squares[i];
    if (mouseX > s.x && mouseX < s.x + 100 &&
        mouseY > s.y && mouseY < s.y + 100) {

      player.push(i);
      checkGuess();
      return;
    }
  }
}*/

function checkGuess() {
  let step = player.length - 1;

  if (player[step] !== pattern[step]) {
    strikes++;
    level = 1;
    newLevel();
    return;
  }

  if (player.length === pattern.length) {
    level++;
    newLevel();
  }
}

function newLevel() {
  // stack pattern exactly like a memory game
  if (pattern.length < level) {
    pattern.push(floor(random(9)));
  } else {
    pattern = [];
    for (let i = 0; i < level; i++) {
      pattern.push(floor(random(9)));
    }
  }

  // prepare flashing
  showing = true;
  showIndex = 0;
  timer = 0;
  player = [];
}

// seperate mousePressed to handle both games
function mousePressed(){
    if(tempRandomIndex == 1){
        // If on win screen, check for "Play Again" click
        if (gameWon) {
            if (
            mouseX > buttonX - buttonW / 2 &&
            mouseX < buttonX + buttonW / 2 &&
            mouseY > buttonY - buttonH / 2 &&
            mouseY < buttonY + buttonH / 2
            ) {
            correctCount++
            startGame(); // Make a function for this later
            }
            return;
        }
        // Regular gameplay
        for (let i = 0; i < circleCount; i++) {
            if (dist(mouseX, mouseY, x[i], y[i]) <= radius) {
            if (i + 1 === current) {
                colors1[i] = color(0, 255, 0); 
                
                if (current > 1) {
                let lastIndex = current - 2; 
                linesX.push([x[lastIndex], x[i]]);
                linesY.push([y[lastIndex], y[i]]);
                }

                current++;
                
                if (current > circleCount) {
                correctSound.stop();
                correctSound.play();
                showWinScreen();
                }
            } else {
                colors[i] = color(255, 0, 0); 
                wrongSound.stop();
                wrongSound.play();
            }
            drawCircles();
            break;
            }
        }
    }
    if(tempRandomIndex == 2){
        if (showing) return; // can't click during flashing

        for (let i = 0; i < 9; i++) {
            let s = squares[i];
            if (mouseX > s.x && mouseX < s.x + 100 &&
                mouseY > s.y && mouseY < s.y + 100) {

            player.push(i);
            checkGuess();
            return;
            }
        }
    }
}

function FinalWinScreen(){
  resizeCanvas(400, 400);
  rectMode(CORNER);
  background(255, 255, 255);
  fill(0,0,0);
  textSize(50);
  if(correctCount >= 6){
    correctSound.stop();
    correctSound.play();
    textAlign(CENTER, CENTER);
    text("You Win!", width/2 , height/4);
    
  }
  else{
    wrongSound.stop();
    wrongSound.play();
     textAlign(CENTER, CENTER);
    text("You Lose!", width/2, height/4);
  }
  

  textSize(20);
  text("You got " + correctCount + " out of 10!" , width/2 + width/55, height/3);
  
    
  button2 = createButton('Back to Menu');
  button2.center();
  
  button2.mousePressed(() => {
    window.location.href = "index.html";
  })
  
}