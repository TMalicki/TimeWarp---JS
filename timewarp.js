/// to add - rotating aroung z - axis
/// rotating around x and y axis

var canvas = document.querySelector("canvas");
var timeWarp = canvas.getContext("2d");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let spaceCenterX = windowWidth/2;
let spaceCenterY = windowHeight/2;

canvas.height = windowHeight;
canvas.width = windowWidth;

timeWarp.fillStyle = 'black';
timeWarp.fillRect(0,0, windowWidth, windowHeight);

let star = new Array;
let movingAroundZAxisLeft = false;
let movingAroundZAxisRight = false;
//let movingUp = false;
//let movingDown = false;

class Star 
{
    constructor()
    {
        this.position = [0, 0, 0];
        this.radius = 0;    
        this.speed = 0;
        this.sizeScale = 0;
        this.scalarX = 5;
        this.scalarY = 5;
    }

    setPositions(x, y, z)
    {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    setSpeed()
    {
        this.speed = random(0.01, 0.1);
    }

    setSizeScale()
    {
        this.sizeScale = random(10, 100);
    }

    draw()
    {
        timeWarp.beginPath();
        timeWarp.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
        timeWarp.fillStyle = 'white';
        timeWarp.fill();
    }

    move(angleRad)
    {    
        /*    
        if(this.position[1] < spaceCenterY && movingUp == true) this.scalarY += 0.2;
        else if(this.position[1] >= spaceCenterY && movingUp == true) this.scalarY -= 0.2
        else if(this.position[1] < spaceCenterY && movingDown == true) this.scalarY -= 0.2;
        else if(this.position[1] >= spaceCenterY && movingDown == true) this.scalarY += 0.2;

        if(this.scalarY >= 8.0) this.scalarY = 8.0
        else if(this.scalarY <= 2.0) this.scalarY = 2.0;

        if(movingUp == false && movingDown == false)
        {
            this.scalarY = 5.0; this.scalarX = 5.0;
        }
        */
        this.position[0] += this.scalarX * this.speed * Math.cos(angleRad);
        this.position[1] += this.scalarY * this.speed * Math.sin(angleRad);

        this.position[2] += this.speed;
        this.radius += this.speed/this.sizeScale;
        this.speed += 0.05;

        this.eraseAtBorder();
    }

    eraseAtBorder()
    {
        if(this.position[0] >= windowWidth || this.position[0] <= 0 || this.position[1] >= windowHeight || this.position[1] <= 0)
        {
            this.reborn();
        }
    }

    reborn()
    {        
        this.position[0] = random(0, windowWidth);
        this.position[1] = random(0, windowHeight);
        this.position[2] = 0;
        this.radius = 0;
        this.setSizeScale();
        this.setSpeed();
    }
}

setInterval(
function() 
{ 
    clearWindow();
    for(let i = 0; i<star.length - 1; i++)
    {
        let angleRad = Math.atan2(star[i].position[1] - spaceCenterY, star[i].position[0] - spaceCenterX);
        if(movingAroundZAxisLeft == true) angleRad += 0.4;
        else if(movingAroundZAxisRight == true) angleRad -= 0.4;
        star[i].move(angleRad);
        star[i].draw();
    }
}, 1000/60);


function begin(amount)
{
    for(let i = 0; i < amount; i++)
    {
        star.push(new Star);
    }

    for(let i = 0; i < amount; i++)
    {
        let x = random(0, windowWidth);
        let y = random(0, windowHeight);
        let z = 0;

        star[i].setPositions(x, y, z);
        star[i].setSizeScale();
        star[i].setSpeed();
        star[i].draw();
    }
}

//document.addEventListener();

document.onkeydown = checkKeyD;
document.onkeyup = checkKeyU;

function checkKeyD(e)
{
    if(e.keyCode == "69") 
    {
        movingAroundZAxisLeft = true;
      
    }
    else if(e.keyCode == "81") 
    {
        movingAroundZAxisRight = true;
    }   
    /*
    else if(e.keyCode == "38")
    {
        spaceCenterY += 2;
        if(spaceCenterY > windowHeight/2 + 100) spaceCenterY = windowHeight/2 + 100;
        movingUp = true;

    }
    else if(e.keyCode == "40")
    {
        spaceCenterY -= 2;
        if(spaceCenterY < windowHeight/2 - 100) spaceCenterY = windowHeight/2 - 100;
        movingDown = true;
    }
    */
}
function checkKeyU(e)
{
    if(e.keyCode == "69")
    {
        movingAroundZAxisLeft = false;
    }
    if(e.keyCode == "81")
    {
        movingAroundZAxisRight = false;
    }
    /*
    if(e.keyCode == "38")
    {
        spaceCenterY = windowHeight/2;
        movingUp = false;
    }
    if(e.keyCode == "40")
    {
        spaceCenterY = windowHeight/2;
        movingDown = false;
    }
    */
}

function random(min, max)
{
    return (Math.random() * (max - min) ) + min;
}

function clearWindow()
{
    timeWarp.fillStyle = 'black';
    timeWarp.fillRect(0,0, windowWidth, windowHeight);
}

begin(2500);