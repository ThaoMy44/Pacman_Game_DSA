import MovingDirection from "./MovingDirection.js";

export default class Pacman{
    constructor(x,y,tileSize, velocity, tileMap){
        this.x = x;
        this.y = y ;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.current = null;
        this.request = null;

        this.pacmanAnimationTimerDefault = 10;
        this.pacmanAnimatorTimer = null;

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacmanImages();
    }
    
    draw(ctx){
        this.#move();
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], 
            this.x, 
            this.y, 
            this.tileSize, 
            this.tileSize);

    }

    #loadPacmanImages(){
        const pacmanImage1 = new Image(); // pacman close
        pacmanImage1.src="../images/pac0.png"

        const pacmanImage2 = new Image(); // pacman open
        pacmanImage2.src="../images/pac1.png"

        const pacmanImage3 = new Image();
        pacmanImage3.src="../images/pac2.png"

        const pacmanImage4 = new Image();
        pacmanImage4.src="../images/pac1.png"

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
        }

        //down
        if(event.keyCode === 40 || event.keyCode == 83){
            if(this.current == MovingDirection.up)
                this.current = MovingDirection.down;
            this.request = MovingDirection.down;
        }

        //left
        if(event.keyCode === 37 || event.keyCode == 65){
            if(this.current === MovingDirection.right)
                this.current = MovingDirection.left;
            this.request = MovingDirection.left;
        }

        //right
        if(event.keyCode == 39 || event.keyCode == 68 ){
            if(this.current == MovingDirection.left)
                this.current = MovingDirection.right;
            this.request = MovingDirection.right;
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
            this.current,)){
                return;
            }

        switch(this.current){
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

    #animate(){
        
    }

}