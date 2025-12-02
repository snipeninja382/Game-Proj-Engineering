let menuState = "menu";
let menubuttons = [];

//images + hoverImages
let menuBg, optBg, freeBg, startBg;
let startHov, freeHov, optHov, quitHov;
let menuBaseBG;

let buttons = {
  menu : [],
  settings : [],
  freeplay : [],
};

let hovImg = {}

const images = [
  "menu_image/factorio_freeplay.jpg",
  "menu_image/factorio_main.jpg",
  "menu_image/factorio_start.jpg",
  "menu_image/factorio_options.jpg"
];

const hover_img = [
  //Main Menu
  "hover_image/menu_start_hover.jpg",
  "hover_image/menu_freeplay_hover.jpg",
  "hover_image/menu_options_hover.jpg",
  "hover_image/menu_quit_hover.jpg",
  
  //Settings 
  "hover_image/settings_X_hover.jpg",
  
  "hover_image/settings_plus_hover.jpg",
  "hover_image/settings_minus_hover.jpg",
  "hover_image/settings_unmute_hover.jpg",
  "hover_image/settings_mute_hover.jpg",
  
  //Freeplay
  "hover_image/freeplay_X_hover.jpg"
];

const images_hov = {};

//Sounds
let musicTrack; //Current music track
let audioEnabled = false; //Gets set to true if p5.sound loads and the music track exists
let audioStarted = false;

let click_soft;

//Volume Variables
let volume = 0.5; //Range from 0.0 - 1.0
let volmax = 1.0;
let volmin = 0.0;

let isMuted = false;
let preVol = 0.5; //Stores the volume level when muted


//------------------LOAD SOUNDS AND MUSIC ------------------//
function preload() {
  //Load the images needed for the main menu :3
  menuBaseBG = loadImage(images[1]);
  optBg = loadImage(images[3]);
  freeBg = loadImage(images[0]);
  startBg = loadImage(images[2]);
  
  images_hov["start"] = loadImage(hover_img[0]);
  images_hov["freeplay"] = loadImage(hover_img[1]);
  images_hov["settings"] = loadImage(hover_img[2]);
  images_hov["quit"] = loadImage(hover_img[3]);
  
  images_hov["X_sett"] = loadImage(hover_img[4]);
  images_hov["plus"] = loadImage(hover_img[5]);
  images_hov["minus"] = loadImage(hover_img[6]);
  images_hov["unmute"] = loadImage(hover_img[7]);
  images_hov["mute"] = loadImage(hover_img[8]);
  
  images_hov["X_free"] = loadImage(hover_img[9]);
  
  console.log("Loaded images");
  
  //Load sounds. The try catch function below causes an error
  soundFormats('mp3') //This looks so ugly bro ;-;
  
  musicTrack = loadSound("Sounds/Songs/menu_theme1.mp3", () => {audioEnabled = true;                                    console.log("Loaded music");
}, (Error) => {
    audioEnabled = false;
    console.log("Failed to load music")
  } 
);
  
  click_soft = loadSound(
    "Sounds/Effects/click_soft.wav",
    () => {audioEnabled = true; console.log("Loaded click sound");},
    (Error) => {audioEnabled = false; console.log("Failed to load click sound")}
  );
  
  
  console.log("Sounds attmepted to load (callbacks set).");
}

function setup() {
  createCanvas(600, 400);
  resizeCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont("Arial");
  
  //Button definitions
  const menuDefs = [ //Make definitions for each button on the menu
    ["Start", width/2 - width/4.71, height/2 + height/9, 370, 100, () => menuState = "game", "start"],
    ["Settings", width/2 - width/4.71, height/2 + height/3.12, 370, 100, () => menuState = "settings", "settings"],
    ["FreePlay", width/2 + width/5.71, height/2 + height/9, 370, 100, () => menuState = "freeplay", "freeplay"],
    ["Quit", width/2 + width/5.71,  height/2 + height/3.12, 370, 100, () => menuState = "quit", "quit"]
  ];
  
  const settingDefs = [ //Defs for setting buttons
    
    ["volUp", width/2 - width/18.2, height/2 - height/8.5, 150, 150, () => adjustVolume(+0.1), "plus"],
    ["volDown", width/2 + width/10, height/2 - height/8.5, 150, 150, () => adjustVolume(-0.1), "minus"],
    ["Mute", width/2 + width/10 , height/2 + height/4.5, 150, 150, () => toggleMute(), "mute"],
    ["unMute",width/2 - width/18.2, height/2 + height/4.5, 150, 150, () => untoggleMute(), "unmute"],
    
    ["X", width - width/6.25, height/9.7, 50, 50, () => menuState = "menu", "X_sett"]
  ];
  
  const freeplayDefs = [ //Defs for freeplay buttons
    ["X", width - width/6.25, height/9.7, 50, 50, () => menuState = "menu", "X_free"],
    ["num1", width/2 - width/4, height/2, 410, 220, () => window.location.href = "FirstGame.html"],
    ["num2", width/2 - width/55, height/2, 410, 220, () => window.location.href = "SecondGame.html"],
    ["num3", width/2 + width/4.68, height/2, 410, 220, () => window.location.href = "ThirdGame.html"],
  ];
  addbuttons("menu", menuDefs); //Call the funtion
  addbuttons("settings", settingDefs);
  addbuttons("freeplay", freeplayDefs);
}

//------------------DRAWING FUNCTIONS-------------------//

//State of the Screen funtion :p
function draw() {
  background(40);
  
  if (menuState === "menu") {
    drawMenu();
  }
  else if (menuState === "game") {
    drawGame();
  }
  else if (menuState === "settings") {
    drawSettings();
  }
  else if (menuState === "freeplay") {
    drawFreeplay();
  }
}

function drawMenu() {
  let bgToDraw = menuBaseBG;
  
  for (let b of buttons.menu) {
    if (b.isHovering() && b.hoverkey && images_hov[b.hoverkey]) {
      bgToDraw = images_hov[b.hoverkey]
    }
  }
  
  image(bgToDraw, 0, 0, width, height);
  
  for(let button of buttons.menu) {
    button.show();
  }
}

function drawGame() {
  window.location.href = "FreePlay.html";
}

function drawSettings() {
  image(optBg, 0, 0, width, height);
  let hoverBG = null;
  
  let button;
  let b
  
  for (b of buttons.settings) {
    if (b.isHovering() && b.hoverkey && images_hov[b.hoverkey]) {
      hoverBG = images_hov[b.hoverkey];
      break;
    }
  }
  
  if (hoverBG) {
    image(hoverBG, 0, 0, width, height);
  }
  
  for (button of buttons.settings) {
    button.show();
  }
  
  //Following is for debug purposes. Comment to remove it
  push();
  fill(255);
  textSize(12);
  textAlign(LEFT, TOP);
  text("Volume: " + (isMuted ? "Muted" : nf(volume,1,1)), 8, 8);
  text("Audio enabled: " + (audioEnabled ? "Yes" : "No"), 8, 24);
  pop();
}

function drawFreeplay() {
  image(freeBg, 0, 0, width, height);
  
  let hoverBG = null;
  
  let button;
  let b
  
  for (b of buttons.freeplay) {
    if (b.isHovering() && b.hoverkey && images_hov[b.hoverkey]) {
      hoverBG = images_hov[b.hoverkey];
      break;
    }
  }
  
  if (hoverBG) {
    image(hoverBG, 0, 0, width, height);
  }
  
  for (button of buttons.freeplay) {
    button.show();
  }
  
}

//Make the screen do something if the mouse is pressed


function mousePressed() {
  if (!audioStarted) {
    
    if (typeof getAudioContext === "function") {
      getAudioContext().resume().catch(() => {});
    }
    
    if (audioEnabled && musicTrack) {
      musicTrack.setLoop(true);
      musicTrack.setVolume(isMuted ? 0 : volume);
      musicTrack.play();
    }
    audioStarted = true;
  }
  
  if (menuState === "menu") {
    for (let button of buttons.menu) {
      button.checkClick();
    }
  } else if(menuState === "settings") {
    for (let button of buttons.settings) {
      button.checkClick();
    }
  } else if(menuState === "freeplay") {
    for (let button of buttons.freeplay) {
      button.checkClick();
    }
  }
    
}

function keyPressed() {
  if (keyCode == ESCAPE && menuState !== "menu") {
    console.log(keyCode + " was pressed by user")
    menuState = "menu";
    
  }
}

//Makes the volume go up or down depending on input
function adjustVolume(delta) {
  if (isMuted) {
    isMuted = false;
    
    if (!preVol || preVol <= 0) {
      preVol = volume || 0.5;
    }
  }
  volume = constrain(round((volume + delta) * 10) / 10, volmin, volmax)
  
  if (audioEnabled && musicTrack) {
    musicTrack.setVolume(volume);
  }
  
  console.log("Adjusted Volume: => ", volume);
}

//Mute and unMute functions
function toggleMute() {
  preVol = volume;
  isMuted = true;
  
  if (audioEnabled && musicTrack) {
    musicTrack.setVolume(0);
  }
  
  console.log("Muted (prevol saved) => ", preVol);
}

function untoggleMute() {
  isMuted = false;
  volume = (preVol !== undefined) ? preVol : 0.5;
  
  if (audioEnabled && musicTrack) {
    musicTrack.setVolume(volume);
  }
  
  console.log("UnMuted (volume restored) => ", volume);
}

function addbuttons(state, defs) {
    for (let def of defs) {
      
      const[label, x, y, w, h, onClick, hoverkey] = def;
      
      buttons[state].push(new Button(label, x, y, w, h, onClick, hoverkey));
    }
}

class Button {
  constructor(label, x, y, w, h, onClick, hoverkey) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onClick = onClick;
    this.hoverkey = hoverkey;
  }
  
  show() { //remove the block comment characters for debugging
    
    /*let hover = this.isHovering();
    fill(hover ? 100 : 70); //This is a glorified if statement
    stroke(255) //Black
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10); //Make a rectangle
    
    fill(255);
    noStroke();
    textSize(24);
    text(this.label, this.x, this.y);*/
    
  }
  
  isHovering() {
    return mouseX > this.x - this.w / 2 &&
           mouseX < this.x + this.w / 2 &&
           mouseY > this.y - this.h / 2 &&
           mouseY < this.y + this.h / 2;
  }
  
  checkClick() {
    if (this.isHovering()) { //include function bro :P
      // I can add a sound effect here for the click
      click_soft.play();
      this.onClick();
    }
  }
}

