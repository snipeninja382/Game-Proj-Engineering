let x = [];
let y = [];
let radius = 20;
let circleCount = 6;
let colors = [];
let current = 1; 
let linesX = [];
let linesY = [];
let wrongSound; 
let correctSound;
let gameWon = false;

// Button position and size
let buttonX, buttonY, buttonW, buttonH;

function preload() {
  wrongSound = loadSound('Fahh Sound Effect.mp3'); 
  wrongSound.setVolume(0.3);
  
  correctSound = loadSound('Correct Sound Effect.mp3'); 
  correctSound.setVolume(1.3);
}

function setup() {
  createCanvas(500, 500);
  startGameEx2();
}

function startGameEx2() {
  // Reset all variables
  x = [];
  y = [];
  colors = [];
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
      colors[i] = color(0);
      i++;
    }
  }

  drawCircles();
}

function draw() {
  
  if (gameWon) {
    drawWinScreen();
  }
}

function drawCircles() {
  background(255);
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
    fill(colors[i]);
    ellipse(x[i], y[i], radius * 2, radius * 2);
    fill(255);
    text(i + 1, x[i], y[i]);
  }
}

function mousePressed() {
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
        colors[i] = color(0, 255, 0); 
        
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

function showWinScreen() {
  gameWon = true;
}

function drawWinScreen() {
  background(255);

  // Draw colored square
  fill(200, 255, 200);
  stroke(0);
  rectMode(CENTER);
  rect(width / 2, height / 2 - 30, 300, 150, 20);

  // "You Won!" text
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("You Won!", width / 2, height / 2 - 60);

  // Play Again button (white rectangle)
  buttonX = width / 2;
  buttonY = height / 2 + 20;
  buttonW = 150;
  buttonH = 50;
  
  fill(255); // white background
  stroke(0);
  rect(buttonX, buttonY, buttonW, buttonH, 10);
  
  fill(0);
  textSize(20);
  text("Back to Menu", buttonX, buttonY);
}