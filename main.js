
import { Ball } from './ball.js';
import { UI } from './UI.js';
import { EnemyAlfa} from './particle.js';
import { BuildingCube } from './building.js';
import { WeaponBase, Weapon, WeaponAlfa } from './weapon.js';


window.addEventListener('load',function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    const rect = canvas.getBoundingClientRect();
    canvas.addEventListener("mousemove", connectPath, false);
    canvas.addEventListener("click", onClick, false);
    var posXcircle = 10;
    var posYcircle = canvas.height;
    var rxArr=[];
    var maxSpeed = 50;
    var attraction = 0.1; 
    var mX = posXcircle;
    var mY  = posYcircle;
    var boolClick = false;
    var randX =  Math.floor(Math.random() * (rect.width - 10)) + 10;
    var randY = Math.floor(Math.random() * (rect.height - 10)) + 10;
    let enemies = [];
    let weapons = [];
    let specialWeapons = [];
    let buildingCubes = [];
    let w1 = '';
    let ui  = new UI();
    let zniceni =  0;
    let countCubes = 0;

    //let ball = new Ball(canvas,randX,randY,10,"red",50,1);
    //let ui  = new UI(ball);

    function connectPath(e){
        mX = e.clientX - rect.left;
        mY = e.clientY - rect.top;

    }


    function onClick(e) {
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;


        if (w1.countWeapons>0) {
            initWeapon(mouseX,mouseY);
            initSpecialWeapon(mouseX,mouseY);
            w1.countWeapons -=1;
        }


    }
    
    class RectangleXY{
        constructor(x,y,w,h,colorX,name){
            this.x= x;
            this.y = y;
            this.w=w;
            this.h=h;
            this.color = colorX;
            this.name = name;
        };
        draw(context){
            context.beginPath();
            context.rect(this.x, this.y, this.w, this.h);
            context.fillStyle = this.color;
            context.strokeStyle  = this.color;
            context.fill();
        }
    }

    function darawRandomRectangle(){
        rxArr.forEach(rx =>{
            rx.draw(ctx);
        });

    }

    function initWeapon(mouseX,mouseY)
    {
        weapons.push(new WeaponAlfa(mouseX,mouseY)); 
    }


    function initSpecialWeapon(mouseX,mouseY)
    {
        let speed = 80;
        let activate = false;
        specialWeapons.forEach(weapon =>{
            if(weapon.move === 0 && activate === false){
                let dX = (mouseX) - weapon.x;
                let dY = (mouseY) - weapon.y;
                let distance = Math.sqrt(dX*dX + dY*dY).toFixed(3);
                weapon.init((dX/distance),(dY/distance),speed);
                activate = true;
            }
            
        })
    }



    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        darawRandomRectangle();


        enemies.forEach(enemy =>{
            enemy.draw(ctx);
            if(enemy.markedForDeletion) enemies.splice(enemies.indexOf(enemy),1);
            if(enemies.length<1){initEnemy();}
        });

        weapons.forEach(weapon =>{
            weapon.draw(ctx);
            if(weapon.markedForDeletion) weapons.splice(weapons.indexOf(weapon),1);
        });


        specialWeapons.forEach(weapon =>{
            weapon.draw(ctx);
            if(weapon.markedForDeletion) specialWeapons.splice(specialWeapons.indexOf(weapon),1);
        });


        buildingCubes.forEach(bc =>{
            bc.draw(ctx);
            if(bc.markedForDeletion) buildingCubes.splice(buildingCubes.indexOf(bc),1);
        });





        w1.draw(ctx);
        collisionWeaponEnemy();
        checkWeaponInTarget();
        collisionEnemyBuilding();


        zniceni =  Math.round(100-(buildingCubes.length/countCubes)*100);

        ui.draw(ctx,w1.countWeapons,zniceni);
        requestAnimationFrame(animate);
      }

      function checkWeaponInTarget(){
        weapons.forEach(weapon =>{
            specialWeapons.forEach(weaponS =>{
                let k = kolizeObj(weapon,weaponS);
                if(k == true){
                    weaponS.markedForDeletion = true;
                    weapon.expansion = 1;
                }
            })
        })
      }

      function collisionEnemyBuilding(){
        enemies.forEach(enemy => {
            buildingCubes.forEach(bc =>{
                    let kolize = kolizeEnemyBuilding(enemy,bc)
                    if(kolize==true){
                        //weapon.counterTimer = 0.1;
                        enemy.markedForDeletion = true;
                        //weapon.markedForDeletion = true;
                    }

            })
      })  
      }


      function kolizeEnemyBuilding(enemy,bc){

        if(enemy.y + enemy.size > bc.y && enemy.x > bc.x && enemy.x <= bc.x + bc.w){
            enemy.markedForDeletion = true;
            bc.markedForDeletion = true;
        }


      }



      function collisionWeaponEnemy(){
        enemies.forEach(enemy => {
            weapons.forEach(weapon =>{
                if(weapon.expansion > 0){
                    let kolize = kolizeObj(enemy,weapon)
                    if(kolize==true){
                        weapon.counterTimer = 0.1;
                        enemy.markedForDeletion = true;
                        //weapon.markedForDeletion = true;
                    }
                }
            })
      })
    }

    function kolizeObj(enemy, weapon) {
            // Získání souřadnic středů a poloměrů obou kol
            let x1 = enemy.x;
            let y1 = enemy.y;
            let r1 = enemy.size;
        
            let x2 = weapon.x;
            let y2 = weapon.y;
            let r2 = weapon.size;
        
            // Výpočet vzdálenosti mezi středy kruhů
            var vzdalenostStredy = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
            // Porovnání vypočítané vzdálenosti s součtem poloměrů
            if (vzdalenostStredy < r1 + r2) {
                // Kolize nastala
                return true;
            }
        
            // Kolize nenastala
            return false;
    }




    function initEnemy(){

        for(let i = 0;i<20;i++){
            let x = Math.floor(Math.random() * canvas.width-20) + 20;
            let size = Math.floor(Math.random() * 7) + 3;
            enemies.push(new EnemyAlfa(x,-20,size,canvas));
        }

    }

    function initWeapons(){
        let x = 500;
        let y = 450;
        w1 = new WeaponBase(x, y,20,50,canvas);
        for(let i =0;i<20;i++){
            specialWeapons.push(new Weapon(x,y,ctx));
        }
    }

    function initBuilding(){
        let startX = 100;
        let startY  = 380;

        // Šířka a výška jednoho malého kvádru
        var smallCubeWidth = 30;
        var smallCubeHeight = 30;

        // Počet řádků a sloupců malých kvádrů
        var numRows = 4;
        var numCols = 11;

        // Vykreslení kvádru ze 30 malých kvádrů
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {
               let x = col * smallCubeWidth + startX;
               let y = row * smallCubeHeight + startY;
                buildingCubes.push(new BuildingCube(x,y,smallCubeWidth,smallCubeHeight,ctx));
            }
        }

        countCubes = buildingCubes.length;
    }




      let colorX = 'green';
      const rx1 = new RectangleXY(10,400,25,100,colorX,"Ga");
      const rx2 = new RectangleXY(402,270,170,90,colorX,"Gb");
      const rx3 = new RectangleXY(202,250,10,110,colorX,"Gc");
      const rx4 = new RectangleXY(300,300,50,50,colorX,"Gd");
      const rx5 = new RectangleXY(480,150,50,50,colorX,"Ge");
      colorX = 'red';
      const rxObject = new RectangleXY(202,50,10,50,colorX,"Ra");
      const rxObject2 = new RectangleXY(602,150,10,80,colorX,"Rb")
      const rxObject3 = new RectangleXY(502,380,10,50,colorX,"Rc");
      rxArr.push(rx1);
      //rxArr.push(rx2);
      //rxArr.push(rx3);
      //rxArr.push(rx4);
      //rxArr.push(rx5);
      //rxArr.push(rxObject);
      //rxArr.push(rxObject2);
      //rxArr.push(rxObject3);


      initEnemy();
      initWeapons();
      initBuilding();
      animate();
 
})