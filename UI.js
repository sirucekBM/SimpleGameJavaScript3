
export class UI{
    constructor() {
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.fontColor = "black";

    }
    draw(context,pocetStrel,zniceni){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.fontColor;

        context.fillText('Počet střel: ' + pocetStrel,20,50);
        context.fillText('poškození: ' + zniceni + ' %',20,90);
        context.restore();
    }
 

}