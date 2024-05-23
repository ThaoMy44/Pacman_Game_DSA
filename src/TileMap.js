import Ghost from "./Ghost.js";
import MovingDirection from "./MovingDirection.js";
import Pacman from "./Pacman.js";
 

export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = "./images/yellowdot.png"
        
        this.wall = new Image();
        this.wall.src = "./images/wall.png"
    }
    //1 wall
    //0 dot
    //4 pacman
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        
    ];
    draw(ctx){
        for(let row = 0; row < this.map.length; row++) {
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 1 ){
                    this.#drawWall(ctx, column, row, this.tileSize);
                }
                else if(tile === 0){
                    this.#drawDot(ctx, column, row, this.tileSize);
                }
                else{
                    this.#drawBlank(ctx, column, row, this.tileSize)
                    
                }

                // ctx.strokeStyle = "yellow";
                // ctx.strokeRect(
                //     column * this.tileSize,
                //     row * this.tileSize, 
                //     this.tileSize, this.tileSize);
            }
        }
    }

    #drawWall(ctx, column, row, size){
        ctx.drawImage(this.wall,column*this.tileSize, row *this.tileSize)
    }

    #drawDot(ctx, column, row, size){
        ctx.drawImage(this.yellowDot,column*this.tileSize, row *this.tileSize)
    }

    #drawBlank(ctx, column, row, size){
        ctx.fillStyle = "black";
        ctx.fillRect(column*this.tileSize, row *this.tileSize,size,size)
    }

    getPacman(velocity){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 4){
                    this.map[row][column] = 0;
                    return new Pacman(column * this.tileSize,
                        row * this.tileSize, 
                        this.tileSize, 
                        velocity, this);
                }
            }
        }
    }

    getGhosts(velocity) {
        const ghosts = [];
        const imageIndices = [0, 1, 2];
        //const shuffledImageIndices = this.#shuffle(imageIndices); // Shuffle the image indices
    
        let imageIndex = 0;
    
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile == 6) {
                    this.map[row][column] = 0;
                    ghosts.push(
                        new Ghost(
                            column * this.tileSize,
                            row * this.tileSize,
                            this.tileSize,
                            velocity,
                            this,
                            imageIndices[imageIndex] // Assign shuffled image index
                        )
                    );
                    imageIndex = (imageIndex + 1) % imageIndices.length; // Move to the next shuffled image index
                }
            }
        }
        return ghosts;
    }
    #shuffle(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x,y,direction){
        if(direction == null){
            return
        }
        if(Number.isInteger(x/ this.tileSize)&&
        Number.isInteger(y/ this.tileSize))
        {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch(direction){
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                   
            }
            const  tile = this.map[row][column];
            if (tile === 1){
                return true;
            }    
        }
        return false;
    }

    eatDot(x,y){
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if(Number.isInteger(row) && Number.isInteger(column)){
            if(this.map[row][column] === 0){
                 this.map[row][column] = 100;
                 return true;
            }
        }
        return(false);
    }
}