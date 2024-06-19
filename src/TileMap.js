import Ghost from "./Ghost.js";
import MovingDirection from "./MovingDirection.js";
import Pacman from "./Pacman.js";
import Queue from "./Queue.js";
import Stack from "./Stack.js";
 

export default class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.eated = false;

        this.yellowDot = new Image();
        this.yellowDot.src = "./images/food.png"

        this.pinkDot = new Image();
        this.pinkDot.src = "./images/powerfood.png"
        
        this.wall = new Image();
        this.wall.src = "./images/wall.png"

        this.flower = new Image();
        this.flower.src = "./images/flower.png"

        this.tree = new Image();
        this.tree.src = "./images/tree.png"

        this.truck = new Image();
        this.truck.src = "./images/tree2.png"

        this.heartRed = new Image();
        this.heartRed.src = "images/heart.png";

        this.heartGreen = new Image();
        this.heartGreen.src = "images/heart_green.png";

        this.heart = this.heartRed;
        this.heartAnimationTimerDefault = 10;
        this.heartAnimationTimer = this.heartAnimationTimerDefault;
        
        this.powerDot = this.pinkDot;
        this.powerDotAnmationTimerDefault = 30;
        this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault ;

        this.dotQueue = new Queue();
        this.powerDotStack = new Stack();
        this.#initializeDots();
    }
    //1 wall
    //2 flower
    //0 dot
    //4 pacman
    //6 ghost
    //7 powerdot
    //8 heart

    //9 tree
    //10 truck
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1],
        [1, 0, 0, 2, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 9, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 6, 0, 2, 2, 9, 0, 1],
        [1, 6, 10, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 10, 0, 1],
        [1, 2, 2, 0, 0, 2, 2, 0, 0, 10, 10, 0, 0, 2, 2, 0, 0, 2, 2, 1],
        [1, 0, 0, 0, 7, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1],
        [1, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 2, 0, 0, 0, 0, 2, 2, 10, 10, 2, 2, 0, 0, 0, 0, 2, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
        [1, 0, 2, 2, 2, 2, 2, 0, 0, 9, 9, 0, 0, 2, 2, 2, 2, 2, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
                else if(tile == 7){
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                }
                else if(tile === 2 ){
                    this.#drawFlower(ctx, column, row, this.tileSize);
                } 
                else if(tile == 8){
                    this.#drawHeart(ctx, column, row, this.tileSize);
                }
                else if(tile == 9){
                    this.#drawTree(ctx, column, row, this.tileSize);
                }
                else if(tile == 10){
                    this.#drawTruck(ctx, column, row, this.tileSize);
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

    #drawFlower(ctx, column, row, size){
        ctx.drawImage(this.flower,column*this.tileSize, row *this.tileSize)
    }

    #drawTree(ctx, column, row, size){
        ctx.drawImage(this.tree,column*this.tileSize, row *this.tileSize)
    }

    #drawTruck(ctx, column, row, size){
        ctx.drawImage(this.truck,column*this.tileSize, row *this.tileSize)
    }

    #drawDot(ctx, column, row, size){
        ctx.drawImage(this.yellowDot,column*this.tileSize, row *this.tileSize)
    }

    #drawBlank(ctx, column, row, size){
        ctx.fillStyle = "#00a99d";
        ctx.fillRect(column*this.tileSize, row *this.tileSize,size,size)
    }
    #initializeDots() {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 0) {
                    this.dotQueue.enqueue({ row, column });
                } else if (tile === 7) {
                    this.powerDotStack.push({ row, column });
                }
            }
        }
    }
    

    #drawPowerDot(ctx, column, row, size){
        this.powerDotAnmationTimer--;
        if (this.powerDotAnmationTimer === 0) {
          this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
          if (this.powerDot == this.pinkDot) {
            this.powerDot = this.pinkDot;
          } else {
            this.powerDot = this.pinkDot;
          }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size);
    }
    #drawHeart(ctx, column, row, size){
        this.heartAnimationTimer--;
        if (this.heartAnimationTimer === 0) {
          this.heartAnimationTimer = this.heartAnimationTimerDefault;
          if (this.heart == this.heartRed) {
            this.heart = this.heartGreen;
          } else {
            this.heart = this.heartRed;
          }
        }
        ctx.drawImage(this.heart, column * size, row * size, size, size);
    
    
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
   

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x, y, direction) {
        if (direction == null) {
          return;
        }
    
        if (
          Number.isInteger(x / this.tileSize) &&
          Number.isInteger(y / this.tileSize)
        ) {
          let column = 0;
          let row = 0;
          let nextColumn = 0;
          let nextRow = 0;
    
          switch (direction) {
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
          const tile = this.map[row][column];
          if (tile === 2) {
            return true;
          }
          else if (tile === 1) {
            return true;
          }
        //   else if (tile === 9) {
        //     return true;} 
        else if (tile === 10) {
            return true;}
    }
    return false;
}

    didWin() {
        return this.#dotsLeft() === 0;
    }

    #dotsLeft() {
        return this.map.flat().filter((tile) => tile === 0).length;
    }

    eatDot(x, y) {
        const row = Math.floor(y / this.tileSize);
        const column = Math.floor(x / this.tileSize);
    
        if (this.map[row][column] === 0) {
            this.map[row][column] = 5; // Set tile to empty space
            this.eated = true;
            this.dotQueue.dequeue(); // Remove from queue
            return true; // Dot eaten successfully
        }
    
        return false; // No dot to eat at given position
    }
    
    eatPowerDot(x, y) {
        const row = Math.floor(y / this.tileSize);
        const column = Math.floor(x / this.tileSize);
    
        if (this.map[row][column] === 7) {
            this.map[row][column] = 5; // Set tile to empty space
            this.powerDotStack.pop(); // Remove from stack
            return true; // Power dot eaten successfully
        }
    
        return false; // No power dot to eat at given position
    }
    
    // eatDot(x, y) {
    //     const row = Math.floor(y / this.tileSize);
    //     const column = Math.floor(x / this.tileSize);
    
    //     if (this.map[row][column] === 0) {
    //         this.map[row][column] = 5; // Set tile to empty space (or another appropriate value)
    //         this.eated = true;
    //         return true; // Dot eaten successfully
    //     }
    
    //     return false; // No dot to eat at given position
    // }

    // eatPowerDot(x, y) {
    //     const row = y / this.tileSize;
    //     const column = x / this.tileSize;
    //     if (Number.isInteger(row) && Number.isInteger(column)) {
    //       const tile = this.map[row][column];
    //       if (tile === 7) {
    //         this.map[row][column] = 5;
    //         return true;
    //       }
    //     }
    //     return false;
    //   }

    eatHeart(x,y){
        const row = Math.floor(y / this.tileSize);
        const column = Math.floor(x / this.tileSize);
        if (Number.isInteger(row) && Number.isInteger(column)) {
            const tile = this.map[row][column];
            if (tile === 8) {
                this.map[row][column] = 5;
            return true;
        }
    }
    return false;

    }
}