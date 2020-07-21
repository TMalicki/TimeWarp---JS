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
let spiralTime = 0;
const spiralA = 10;
let beginSpinning = false;

class Star 
{
    constructor()
    {
        this.position = [0, 0, 0];
        this.radius = 0;    // this should be mapped with distance to border
        this.speed = 0;
        this.sizeScale = 0;
        const k = 0;
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

    turnAroundZAxis()
    {
        debugger;
        spiralTime = Math.atan2(this.position[1], this.position[0]);

        this.position[0] += spiralA * spiralTime * Math.cos(spiralTime);
        this.position[1] += spiralA * spiralTime * Math.sin(spiralTime);
        spiralTime += 0.001;
    }

    move()
    {
        let angleRad = Math.atan2(this.position[1] - spaceCenterY, this.position[0] - spaceCenterX);
        
        this.position[0] += 5 * this.speed * Math.cos(angleRad);
        this.position[1] += 5 * this.speed * Math.sin(angleRad);

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
        star[i].move();
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

document.onkeydown = checkKeyD;
document.onkeyup = checkKeyU;

function checkKeyD(e)
{
    if(e.keyCode == "69") 
    {
        beginSpinning = true;
        console.log("e"); // star[i].turnAroundZAxis;
        for(let i = 0; i < star.length - 1; i++)
        {
            debugger;
            star[i].turnAroundZAxis();
        }
    }
    else if(e.keyCode == "81") console.log("q");
}
function checkKeyU(e)
{
    if(e.keyCode == "69")
    {
        t_spiral = -15;
    }
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

begin(10000);