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
    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
        }
    }

    #loadImage() {
        const imagePaths = [
            './images/blinky.png',
            './images/ghost.png',
            './images/blue_ghost.png'
        ];

        if (this.imageIndex >= 0 && this.imageIndex < imagePaths.length) {
            this.image = new Image();
            //this.image.onload = () => console.log(`${imagePaths[this.imageIndex]} loaded successfully.`);
            //this.image.onerror = () => console.error(`Error loading ${imagePaths[this.imageIndex]}`);
            this.image.src = imagePaths[this.imageIndex];}
            
        // } else {
        //     console.error('Invalid image index');
        // }

        this.scaredGhost = new Image();
        this.scaredGhost.src = '../images/blue_ghost.png';


        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '../images/blue_ghost.png';
    }
      
}