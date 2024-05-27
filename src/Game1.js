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

        this.gameOverSound = new Audio("sounds/gameOver.wav");

        this.init();
    }

    setDifficulty(level) {
        switch (level) {
            case 'easy':
                this.velocity = 1;
                //this.lives = 5;
                break;
            case 'medium':
                this.velocity = 2;
                //this.lives = 3;
                break;
            case 'hard':
                this.velocity = 3;
                //this.lives = 1;
                break;
            default:
                this.velocity = 1;
                //this.lives = 3;
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
        this.checkGameOver();
        this.checkGameWin();
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
            // or other conditions for game over, such as lives reaching 0
        );
    }
}
