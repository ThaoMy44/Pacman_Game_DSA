import MovingDirection from "./MovingDirection.js";

export default class Ghost {
    constructor(x,y,tileSize, velocity, tileMap, imageIndex){
        this.x = x;
        this.y = y ;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.imageIndex = imageIndex;
        
        this.image = null;

        this.#loadImage();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length );
        this.directionTimerDefault = this.#random(10, 50);
        this.directionTimer = this.directionTimerDefault ;

        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
    }



    draw(ctx, pause, pacman) {
        if (!pause){
        this.#move();
        this.#changeDirection();
        }
        this.#setImage(ctx, pacman);
        // if (this.image) {
        //     ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
        // }
    }

    #setImage(ctx, pacman) {
        if (pacman.powerDotActive) {
            this.#setImageWhenPowerDotIsActive(pacman);
        } else {
            
            this.image = this.normalImage;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);

    }

    #setImageWhenPowerDotIsActive(pacman) {

        if (pacman.powerDotAboutToExpire) {
            this.scaredAboutToExpireTimer--;
            
        if (this.scaredAboutToExpireTimer === 0) {
            this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
            if (this.image === this.scaredGhost) {
                this.image = this.scaredGhost2;
            } else {
                this.image = this.scaredGhost;
            }
        }
        } else {
            this.image = this.scaredGhost;
        }
    }
    
    collideWith(pacman) {
        const size = this.tileSize / 2;
        if (
          this.x < pacman.x + size &&
          this.x + size > pacman.x &&
          this.y < pacman.y + size &&
          this.y + size > pacman.y
        ) {
          return true;
        } else {
          return false;
        }
      }

    #random(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #move(){
        if(!this.tileMap.didCollideWithEnvironment(this.x, this.y,this.movingDirection)){
            switch(this.movingDirection){
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
            
          }
        }
      }
    
    #changeDirection(){
        this.directionTimer--;
        let newMoveDirection = null;
    
        if (this.directionTimer == 0){
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        
        }

        if (newMoveDirection != null && this.movingDirection != newMoveDirection){
            if(Number.isInteger(this.x/this.tileSize) && Number.isInteger(this.y/this.tileSize) ){
                if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)){
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }

    #loadImage() {
        const imagePaths = [
            './images/blinky.png',
            './images/ghost.png',
            './images/blue_ghost.png'
        ];

        if (this.imageIndex >= 0 && this.imageIndex < imagePaths.length) {
            this.normalImage = new Image();
            //this.image.onload = () => console.log(`${imagePaths[this.imageIndex]} loaded successfully.`);
            //this.image.onerror = () => console.error(`Error loading ${imagePaths[this.imageIndex]}`);
            this.normalImage.src = imagePaths[this.imageIndex];}
            
        // } else {
        //     console.error('Invalid image index');
        // }

        this.scaredGhost = new Image();
        this.scaredGhost.src = '../images/blue_ghost.png';


        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../images/blue_ghost.png';

        this.image = this.normalImage;

    }

    //     draw(ctx) {

//         ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
// }
 
//     #loadImage(){
//         this.normalGhost = new Image();
//         this.normalGhost.src = '../images/blinky.png';


//         this.scaredGhost = new Image();
//         this.scaredGhost.src = '../images/blue_ghost.png';


//         this.scaredGhost2 = new Image();
//         this.scaredGhost2.src = '../images/blue_ghost.png';


//         this.image = this.normalGhost;

//     }
      
}