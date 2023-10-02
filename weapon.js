export class WeaponBase{
    constructor(x, y,w,h,canvas){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "rgba(255, 0, 1)";
        this.canvas = canvas;
        this.countWeapons = 10;
        this.markedForDeletion = false;
    };
    draw(context){
        context.beginPath();
        context.rect(this.x, this.y, this.w, this.h);
        context.fillStyle = this.color;
        context.strokeStyle  = this.color;
        context.fill();
    }
}


export class Weapon{
    constructor(x,y,canvas){
        this.size = 6;// Math.random()* 10 + 10;
        this.speedX = 0;
        this.speedY = 0;
        this.energy = 0;
        this.x = x;
        this.y = y;
        this.color = "rgba(0, 0, 255)";
        this.canvas = canvas;
        this.markedForDeletion = false;
        this.speed = 20;
        this.move = 0;
    };
    draw(context){
        if(this.move >0){
            context.beginPath();
            context.arc(this.x, this.y, this.size,0,Math.PI * 2);
            context.fillStyle = this.color;
            context.strokeStyle  = this.color;
            context.fill();
            if (this.energy >0 ){
                this.x = this.x + this.speedX * this.speed;
                this.y = this.y + this.speedY * this.speed;
                if(this.y > this.canvas.height || this.x > this.canvas.width || this.x < this.size){
                    this.markedForDeletion = true;
                }
            }
    }
    }

    init(speedX,speedY,energy){
        this.speedX = speedX;
        this.speedY = speedY;
        this.energy = energy;
        this.speed = energy/20;
        this.move = 1;        
    }
}


export class WeaponAlfa{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.color = "rgba(0,0,255,1)";
        this.markedForDeletion = false;
        this.size = 10;
        this.expansion = 0;
        this.counterTimer = 0;
    }
    draw(context){
        this.size += this.expansion;
        context.beginPath();
        context.arc(this.x, this.y, this.size,0,Math.PI * 2);
        context.fillStyle = this.color;
        context.strokeStyle  = this.color;
        context.stroke();
        if(this.size > 50 && this.counterTimer == 0){
            this.markedForDeletion = true;
        }
        if(this.size > 50 && this.counterTimer > 0){
            this.expansion = 0.1;
        }

        if(this.size > 60){
            this.markedForDeletion = true;
        }
    }

}