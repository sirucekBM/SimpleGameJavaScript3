export class EnemyAlfa{
    constructor(x, y,size,canvas){
        this.size = size;// Math.random()* 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX =(Math.floor(Math.random() * 5) - 2)*0.2;
        this.speedY =(Math.floor(Math.random() * 6) + 2)*0.2;
        this.color = "rgba(255, 0, 1)";
        this.canvas = canvas;
        this.markedForDeletion = false;
    };
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size,0,Math.PI * 2);
        context.fillStyle = this.color;
        context.strokeStyle  = this.color;
        context.fill();
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        if(this.y > this.canvas.height || this.x > this.canvas.width || this.x < this.size){
            this.markedForDeletion = true;
        }
    }
}


