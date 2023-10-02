export class Ball{
    constructor(canvas,x,y,radius,color,speed,energy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.energy = energy;
        this.canvas = canvas;
        this.gravity = 1;
        this.vx = 0;
        this.vy = 0;
        this.bounce = 0.7;
        this.xFriction = 0.8;
        this.distance = 0;
        this.move = false;
    }
    initMoveBall(initMove){
        this.vy = this.vy*this.speed;
        this.vx = this.vx*this.speed;
        this.move = initMove;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        if(this.move != false){
            this.ballMovement();
        }
    }
   ballMovement(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        //detekce stran leva prava
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0){
            this.vx *= -1;
            this.xF();
        }
          // detekce spodni hrany
        if (this.y + this.radius > this.canvas.height){// ||
            this.y = this.canvas.height - this.radius;
            this.floorDetection();
        }
        //detekce vrchni hrany
        if (this.y < this.radius) {
            this.y = this.y + this.radius+3;
            this.vy *= -1;
            this.xF();
        }
    }
    floorDetection(){
        // Re-positioning on the base
        //bounce the ball
        this.vy *= -this.bounce;
        //do this otherwise, ball never stops bouncing
        if(this.vy<0 && this.vy>-4.1)
        this.vy=0;
        //do this otherwise ball never stops on xaxis
        if(Math.abs(this.vx)<1.1)
        this.vx=0;
        this.xF();
    }
    xF(){
             if(this.vx>0)
             this.vx = this.vx - this.xFriction;
             if(this.vx<0)
             this.vx = this.vx + this.xFriction;
    }
    detectBallObj(rxArr){
        let moveRed = 0;
        let movedObj = 0;
        rxArr.forEach(rec => {
            if(rec.color == "red"){
                moveRed = 0;
            }
            if(this.y + this.radius >= rec.y && this.y - this.radius <= rec.y  + rec.h)
            {
                if(this.x + this.radius >= rec.x && this.x - this.radius <= rec.x  + rec.w)
                {
                        let leftDistanc = Math.abs((this.x + this.radius + 1) - rec.x);
                        let rightDistanc = Math.abs((this.x - this.radius - 1) - (rec.x + rec.w));
                        let topDistanc = Math.abs((this.y + this.radius + 1) - rec.y);
                        let downDistanc = Math.abs((this.y - this.radius - 1)- (rec.y + rec.h));
                        let minValue = Math.min(leftDistanc, rightDistanc, topDistanc, downDistanc);
                        if (minValue == topDistanc)
                        {
                            this.y = rec.y - this.radius;
                            this.floorDetection();
                        }
                        if (minValue == downDistanc)
                        {
                            this.y = rec.y + rec.h + this.radius;
                            this.floorDetection();
                        }

                        if (minValue == leftDistanc)
                        {
                            this.x = rec.x - this.radius;
                            this.vx *= -1;
                        }

                        if (minValue == rightDistanc)
                        {
                            this.x = rec.x +rec.w + this.radius;
                            this.vx *= -1;
                        }
                }
            }
        })}
}