import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const ghosts = tileMap.getGhosts(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio("sounds/gameOver.wav");

function gameLoop(){
    tileMap.draw(ctx);
    pacman.draw(ctx,pause(), ghosts);
    ghosts.forEach((ghost)=>ghost.draw(ctx,pause(),pacman));
    checkGameOver();
    checkGameWin();
}

function pause(){
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
            //gameWinSound.play();
        }
    }
}
  
function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
            //gameOverSound.play();
        }
    }
}

function isGameOver() {
    return ghosts.some(
      (ghost) => !pacman.powerDotActive && ghost.collideWith(pacman)
      //(ghost) => lives == 0

    );
}

tileMap.setCanvasSize(canvas)
setInterval(gameLoop, 1000/75);