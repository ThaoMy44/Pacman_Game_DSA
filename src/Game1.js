import MovingDirection from "./MovingDirection.js";
import TileMap from "./TileMap.js";

export default class Game {
    constructor(canvas, level) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.tileSize = 32;
        this.setDifficulty(level);

        this.tileMap = new TileMap(this.tileSize);

        this.pacman = this.tileMap.getPacman(this.velocity);
        this.ghosts = this.tileMap.getGhosts(this.velocity);

        this.gameOver = false;
        this.gameWin = false;
        this.score = 0;

        this.gameOverSound = new Audio("sounds/gameOver.wav");

        this.init();

    }

    setDifficulty(level) {
        switch (level) {
            case 'easy':
                this.velocity = 1;
                this.lives = 1;
                break;
            case 'medium':
                this.velocity = 2;
                this.lives = 1;
                break;
            case 'hard':
                this.velocity = 3;
                this.lives = 1;
                break;
            default:
                this.velocity = 1;
                this.lives = 1;
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
                //gameWinSound.play();
            }
        }
    }

    checkGameOver() {
        if (!this.gameOver) {
            this.gameOver = this.isGameOver();
            if (this.gameOver) {
                //this.gameOverSound.play();
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
            let text = this.gameWin ? " YOU WIN!" : "GAME OVER";

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, this.canvas.height / 3.2, this.canvas.width, 80);

            this.ctx.font = "60px arial";
            const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
            gradient.addColorStop("0", "yellow");
            gradient.addColorStop("0.5", "red");
            gradient.addColorStop("1.0", "red");

            this.ctx.fillStyle = gradient;
            this.ctx.fillText(text, 150, 260);
        }
    }
}
