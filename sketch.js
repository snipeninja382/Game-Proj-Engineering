function setup() {
  createCanvas(400, 400);
  //let timerTime = 120;
  //let textTimer = createDiv("Time Left: " + timerTime);
  //textTimer.id('timer');
  //textTimer.position(550, 510);

  wrongSound = loadSound('Fahh Sound Effect.mp3'); 
  wrongSound.setVolume(0.3);
  
  correctSound = loadSound('Correct Sound Effect.mp3'); 
  correctSound.setVolume(1.3);

  
  /*setInterval(() =>{
      timerTime--;
      textTimer.html("Time Left: " + timerTime); 
      if(timerTime < 0){
        textTimer.html("Time Left: 0");
        WinScreen();
      }
    }, 1000);*/

}

function preload(){
  
}

let squareX = 205;
let squareY = 205;
let w = 25;

function draw() {
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

    background(220);
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
function restart(){
  loop();
  squareX = 205;
  squareY = 205;
  button1.remove();
}

function nextGame(){
  window.location.href = "index.html";
}

function WinScreen(){
  noLoop();
  fill(255, 255, 255);
  square(0,0, 400);
  fill(0,0,0);
  textSize(50);
  correctSound.stop();
  correctSound.play();
  
  textAlign(CENTER, CENTER);
  text("You Win!", width/2, height/5);
    
  button1 = createButton('Back to Menu');
  button1.center();
  
  button1.mousePressed(nextGame);
  
}