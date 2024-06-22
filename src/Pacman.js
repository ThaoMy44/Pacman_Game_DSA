//Doan Vo Thao My _ ITDSIU22138
//Manages the Frog character's behavior and interactions within the game.
import MovingDirection from "./MovingDirection.js";

export default class Pacman{
    constructor(x,y,tileSize, velocity, tileMap){
        this.x = x;
        this.y = y ;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.startX = x;
        this.startY = y;

        this.current = null;
        this.request = null;

        this.score = 0;

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimationTimer = null;

        this.pacmanRotation = this.Rotation.right;
        this.wakaSound = new Audio("./sounds/waka.wav");

        this.collisionSound = new Audio("./sounds/eatdot.wav");

        this.powerDotSound = new Audio("./sounds/power_dot.wav");
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
        this.timers =[];

        this.eatGhostSound = new Audio("sounds/eat_ghost.wav");

        this.heartActive = false;
        this.heartAboutToExpire = false;
        this.timer1 = [];


        this.madeFirstMove = false;

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacmanImages();
    }
     
//----------------------------------------------------------------//

    draw(ctx, pause, ghosts){
        //function
        if (!pause) {
            this.#move();
            this.#animate();
        }
        this.#eatDot();
        this.#eatPowerDot();
        this.#eatHeart();
        this.#eatGhost(ghosts);
        
        const size = this.tileSize /2;

        //rotation, draw
        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI)/ 180 );
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex],
            -size,
            -size,
            this.tileSize, 
            this.tileSize
        );

        ctx.restore();

    }
//----------------------------------------------------------------//

    Rotation ={
        right : 0,
        down: 1,
        left: 2,
        up: 3,
    }   
//----------------------------------------------------------------//

    #loadPacmanImages(){
        const pacmanImage1 = new Image(); // pacman close
        pacmanImage1.src="../images/frog0.png"

        const pacmanImage2 = new Image(); // pacman open
        pacmanImage2.src="../images/frog1.png"

        const pacmanImage3 = new Image();
        pacmanImage3.src="../images/frog2.png"

        const pacmanImage4 = new Image();
        pacmanImage4.src="../images/frog1.png"

        this.pacmanImages = [
            pacmanImage1, 
            pacmanImage2,
            pacmanImage3,
            pacmanImage4 
        ];

        this.pacmanImageIndex = 0;
    }

    #keydown = (event) => {
        //use WSAD or arrow to move
        //up
        if(event.keyCode === 38 || event.keyCode == 87){
            if(this.current == MovingDirection.down)
                this.current = MovingDirection.up;
            this.request = MovingDirection.up;
            this.madeFirstMove = true;
        }

        //down
        if(event.keyCode === 40 || event.keyCode == 83){
            if(this.current == MovingDirection.up)
                this.current = MovingDirection.down;
            this.request = MovingDirection.down;
            this.madeFirstMove = true;
        }

        //left
        if(event.keyCode === 37 || event.keyCode == 65){
            if(this.current === MovingDirection.right)
                this.current = MovingDirection.left;
            this.request = MovingDirection.left;
            this.madeFirstMove = true;
        }

        //right
        if(event.keyCode == 39 || event.keyCode == 68 ){
            if(this.current == MovingDirection.left)
                this.current = MovingDirection.right;
            this.request = MovingDirection.right;
            this.madeFirstMove = true;
        }

        
    }

    #move(){
        if (this.current !== this.request){
            if(Number.isInteger(this.x/this.tileSize) && 
            Number.isInteger(this.y/this.tileSize)){
                if (!this.tileMap.didCollideWithEnvironment(
                    this.x,
                    this.y,
                    this.request
                )
            )
                this.current = this.request;
            }
        }
    
        if (this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.current,))
            {
                this.pacmanAnimationTimer = null;
                this.pacmanIndex = 1;
                return;
            }
        
        else if (this.current != null && this.pacmanAnimationTimer == null){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
        }

        switch(this.current){
            case MovingDirection.up:
                this.y -= this.velocity;
                this.pacmanRotation = this.Rotation.up;
                break;

            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;

            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break;

            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.right;
                break;
        }
    }

    #animate(){
        
        if(this.pacmanAnimationTimer == null ){
            return;
        }
        this.pacmanAnimationTimer--;
        if(this.pacmanAnimationTimer == 0){
            this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
            this.pacmanImageIndex++;
            if(this.pacmanImageIndex == this.pacmanImages.length)
            this.pacmanImageIndex = 0;
        }
        
    }

    #eatDot(){
        if(this.tileMap.eatDot(this.x,this.y)){
            //play sound
            
            this.wakaSound.play();         
        }
    }

    #eatPowerDot() {
        if (this.tileMap.eatPowerDot(this.x, this.y)) {
            this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotAboutToExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];
    
            let powerDotTimer = setTimeout(() => {
                this.powerDotAboutToExpire = false;
            }, 1000 * 6);
    
            this.timers.push(powerDotTimer);
    
            let powerDotAboutToExpireTimer = setTimeout(() => {
                this.powerDotActive = false;
                this.powerDotAboutToExpire = true;
            }, 1000 * 3);
    
            this.timers.push(powerDotAboutToExpireTimer);
        }
    }

    #eatGhost(ghosts) {
        if (this.powerDotActive) {
            const collideEnemies = ghosts.filter((ghost) => ghost.collideWith(this));
            collideEnemies.forEach((collidingGhost) => {
                const index = ghosts.indexOf(collidingGhost);
                if (index !== -1) {
                    ghosts.splice(index, 1);
                    this.eatGhostSound.play();
                }
                else {
                    this.collisionSound.play(); // Play collision sound if not powered up
                }
            });
        }
}

#eatHeart(){
    if(this.tileMap.eatHeart(this.x, this.y)){
        this.powerDotSound.play();
        
        this.heartActive = true;
        this.heartAboutToExpire =false;
        this.timer1.forEach((timer) => clearTimeout(timer));
        this.timer1 = [];

        let heartTimer = setTimeout(() => {
          
            this.heartActive = false;
            this.heartAboutToExpire= false;
            
          }, 1000 * 5);
    
          this.timer1.push(heartTimer);
    
          let heartAboutToExpireTimer = setTimeout(() => {
        
            this.heartAboutToExpire = true;
          }, 1000 * 3);
    
          this.timers.push(heartAboutToExpireTimer);


    }
  
}


velocityChange(){
    if(this.heartActive){
        this.velocity = 4;
    }else{
        this.velocity = 2;
    }
  }


}