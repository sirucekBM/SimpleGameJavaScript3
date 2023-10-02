export class BuildingCube{
    constructor(x, y,w,h,canvas){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "rgba(0,255, 1)";
        this.canvas = canvas;
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