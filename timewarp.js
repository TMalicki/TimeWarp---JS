var canvas = document.querySelector("canvas");
var timeWarp = canvas.getContext("2d");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
canvas.height = windowHeight;
canvas.width = windowWidth;

timeWarp.fillStyle = 'black';
timeWarp.fillRect(0,0, windowWidth, windowHeight);

let star = new Array;

class Star 
{
    constructor()
    {
        this.position = [0, 0, 0];
        this.radius = 2;    // this should be mapped with distance to border
        this.speed = 0.2;
    }

    setPositions(x, y, z)
    {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    draw()
    {
        timeWarp.beginPath();
        timeWarp.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
        timeWarp.fillStyle = 'white';
        timeWarp.fill();
    }

    move()  // should be made with angle direction based on position - not like now (it goes only in 45 degrees)
    {
        if(windowWidth - this.position[0] > this.position[0] - 0)   // go to the left border
        {
            this.position[0] -= this.speed * 10;
        }
        else    // go to the right border
        {
            this.position[0] += this.speed * 10;
        }
        if(windowHeight - this.position[1] > this.position[1] - 0)  // go to the top border
        {
            this.position[1] -= this.speed * 10;
        }
        else    // go to the bottom border
        {
            this.position[1] += this.speed * 10;
        }

        this.position[2] += this.speed;
        this.radius += this.speed;

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
        console.log(this.position[0] + "   " + this.position[1]);
        this.speed = 0.2;
        this.radius = 2;
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
        star[i].draw();
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

begin(1000);