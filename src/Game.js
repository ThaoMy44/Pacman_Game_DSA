import MovingDirection from "./MovingDirection.js";
import TileMap from "./TileMap.js";



const tileSize = 32;
const velocity = 2;
const velocityghost = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileMap = new TileMap(tileSize); //create object to describe

export const pacman = tileMap.getPacman(velocity);
const ghosts = tileMap.getGhosts(velocity);

let gameOver = false;
let gameWin = false;
let score = 0;

let lives = 3;

// sound
const gameOverSound = new Audio("sounds/gameOver.wav");
//const gameWinSound = new Audio("sounds/gameWin.wav");

function gameLoop(){ // redraw the screen certain number of times every 1 second
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), ghosts);
    ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
    upgradeScore();
    checkCollisions();
    checkGameOver();
    checkGameWin();
    drawRemainingLives();
    
}

function checkGameWin() {
    if (!gameWin) {
      gameWin = tileMap.didWin();
      if (gameWin) {
        gameWinSound.play();
      }
    }
  }
  
  function checkGameOver() {
    if (!gameOver) {
      gameOver = isGameOver();
      if (gameOver) {
        gameOverSound.play();
      }
    }
  }
  
  function isGameOver() {
    return ghosts.some(
      
      (ghost) => lives == 0

    );
  }
  
  function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
  }

 
  function upgradeScore() {
    if(tileMap.eated){
      score+=10;
      tileMap.eated = false;
    }
  }
  function resetPacmanAndGhosts() {
    pacman.x = pacman.startX;
    pacman.y = pacman.startY;
    pacman.current = null;
    pacman.request = null;
  
    ghosts.forEach((ghost) => {
        ghost.x = ghost.startX;
        ghost.y = ghost.startY;
        ghost.current = MovingDirection.right;
    });
  }
  
  function checkCollisions() {
    if (!pacman.powerDotActive) {
        ghosts.forEach((ghost, index) => {
            if (ghost.collideWith(pacman)) {
                lives--;
                //loseLifeSound.play();
                resetPacmanAndGhosts();
                if (lives === 0) {
                    gameOver = true;
                    gameOverSound.play();
                }
            }
        });
    }
}


  

function drawRemainingLives() {
    ctx.font = "20px gemunu libre";
    ctx.fillStyle = "white";
    ctx.fillText(" Lives:", 5, canvas.height - 10);
    for (let i = 0; i < lives; i++) {
        ctx.fillText("❤️", 70 + i * 20, canvas.height - 10);
    }
    ctx.fillText(`Score: ${score}`, canvas.width - 100, canvas.height - 10);
}
  


  
  function drawGameEnd() {
    if (gameOver || gameWin) {
      let text = " YOU WIN!";
      if (gameOver) {
        text = "GAME OVER";
      }
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);
  
      ctx.font = "60px arial";      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", "yellow");
      gradient.addColorStop("0.5", "red");
      gradient.addColorStop("1.0", "red");
  
      ctx.fillStyle = gradient;
      ctx.fillText(text, 150, 260);
    }
  }
  
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75); //call the funtion every x periods of times (milliseconds) (1000 millseconds = 1 seconds / 75 )
// call this method 75 times every 1 second to redraw the screen 

