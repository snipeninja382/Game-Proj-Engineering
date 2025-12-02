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

function setup() {
  wrongSound = loadSound('Fahh Sound Effect.mp3'); 
  wrongSound.setVolume(0.3);
  
  correctSound = loadSound('Correct Sound Effect.mp3'); 
  correctSound.setVolume(1.3);

  createCanvas(460, 460);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);

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

  newLevel();
}

function draw() {
  background(240);

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
      fill(255);
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

  fill(0);
  text("LEVEL " + level + "    STRIKES: " + strikes, width / 2, 25);

  // WIN
  if (level > 10) {
    correctSound.stop();
    correctSound.play();
    window.location.href = "index.html"; // blank link for win page
  }

  // LOSE
  if (strikes >= 3) {
    wrongSound.stop();
    wrongSound.play();
    window.location.href = "index.html"; // blank link for lose page
  }
}

function mousePressed() {
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