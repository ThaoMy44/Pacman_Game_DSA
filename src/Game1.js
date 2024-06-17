import MovingDirection from "./MovingDirection.js";
import TileMap from "./TileMap.js";

export default class Game {
    constructor(canvas, level) {
        this.canvas = canvas;
        this.level = level;

        this.ctx = canvas.getContext("2d");

        this.tileSize = 32;
        this.setDifficulty(level);

        this.tileMap = new TileMap(this.tileSize);

        this.pacman = this.tileMap.getPacman(this.velocity);
        this.ghosts = this.tileMap.getGhosts(this.velocityGhost);

        this.gameOver = false;
        this.gameWin = false;
        this.score = 0;

        this.gameOverSound = new Audio("sounds/gameOver.wav");
        this.gameWinSound = new Audio("sounds/gameWin.wav");

        

        this.init();

    }

    setDifficulty(level) {
        switch (level) {
            case 'easy':
                this.velocity = 1;
                this.velocityGhost = 1;
                this.lives = 3;
                break;
            case 'medium':
                this.velocity = 2;
                this.velocityGhost = 2;
                this.lives = 2;
                break;
            case 'hard':
                this.velocity = 2;
                this.velocityGhost = 2;
                this.lives = 1;
                break;
            default:
                this.velocity = 2;
                this.velocityGhost = 2
                this.lives = 2;
        }
    }

    init() {
        this.tileMap.setCanvasSize(this.canvas);
        setInterval(() => this.gameLoop(), 1000 / 75);
    }

    gameLoop() {
        this.tileMap.draw(this.ctx);
        this.pacman.draw(this.ctx, this.pause(), this.ghosts);
        this.ghosts.forEach((ghost) => ghost.draw(this.ctx, this.pause(), this.pacman));
        this.upgradeScore();
        this.checkCollisions();
        this.checkGameOver();
        this.checkGameWin();
        this.drawRemainingLives();
        this.drawGameEnd();
    }

    pause() {
        return !this.pacman.madeFirstMove || this.gameOver || this.gameWin;
    }

    checkGameWin() {
        if (!this.gameWin) {
            this.gameWin = this.tileMap.didWin();
            if (this.gameWin) {
                gameWinSound.play();
            }
        }
    }

    checkGameOver() {
        if (!this.gameOver) {
            this.gameOver = this.isGameOver();
            if (this.gameOver) {
                this.gameOverSound.play();
            }
        }
    }

    isGameOver() {
        return this.ghosts.some(
            (ghost) => !this.pacman.powerDotActive && ghost.collideWith(this.pacman)
        ) || this.lives === 0;
    }

    upgradeScore() {
        if (this.tileMap.eated) {
            this.pacman.score += 10; // Assuming pacman has a score property
            this.tileMap.eated = false;
        }
    }

    resetPacmanAndGhosts() {
        this.pacman.x = this.pacman.startX;
        this.pacman.y = this.pacman.startY;
        this.pacman.current = null;
        this.pacman.request = null;

        this.ghosts.forEach((ghost) => {
            ghost.x = ghost.startX;
            ghost.y = ghost.startY;
            ghost.current = MovingDirection.right;
        });
    }

    checkCollisions() {
        if (!this.pacman.powerDotActive) {
            this.ghosts.forEach((ghost) => {
                if (ghost.collideWith(this.pacman)) {
                    this.lives--;
                    this.resetPacmanAndGhosts();
                    if (this.lives === 0) {
                        this.gameOver = true;
                        this.gameOverSound.play();
                    }
                }
            });
        }
    }

    drawRemainingLives() {
        this.ctx.font = "20px gemunu libre";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(" Lives:", 5, this.canvas.height - 10);
        for (let i = 0; i < this.lives; i++) {
            this.ctx.fillText("❤️", 70 + i * 20, this.canvas.height - 10);
        }
        this.ctx.fillText(`Score: ${this.pacman.score}`, this.canvas.width - 100, this.canvas.height - 10);
    }
    
    drawGameEnd() {
        if (this.gameOver || this.gameWin) {
            let result = this.gameWin ? "win" : "lose";
            window.location.href = `endGame.html?result=${result}`;
        }
    }

    start() {
        // Implement game start logic here
        console.log(`Game starting at level ${this.level}`);
    }
}
